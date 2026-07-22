import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase";
import { withStore } from "./store";
import { now, id, slugify, periodKey, hashApiKey, generateApiKeySecret } from "./utils";
import type { Profile, Workspace, WorkspaceMember, WorkspaceInvite, ApiKeyRecord, UsagePeriod, MemberRole } from "./types";
import { normalizeProfile } from "./types";
import { randomBytes } from "node:crypto";

export type SettingsBackend = "supabase" | "json";

export class AccountDeletedError extends Error {
  readonly code = "ACCOUNT_DELETED";
  constructor(userId: string) {
    super(`Account deleted: ${userId}`);
    this.name = "AccountDeletedError";
  }
}

export function getSettingsBackend(): SettingsBackend {
  if (process.env.SETTINGS_BACKEND === "json") return "json";
  if (isSupabaseConfigured()) return "supabase";
  if (process.env.NODE_ENV === "development") return "json";
  throw new Error("Supabase required in production");
}

function useSupabase() {
  return getSettingsBackend() === "supabase";
}

// ——— DB → TypeScript mappers ———

function mapProfile(row: Record<string, unknown>): Profile {
  return normalizeProfile({
    userId: row.user_id as string,
    email: (row.email as string) ?? "",
    displayName: (row.display_name as string) ?? "",
    jobTitle: (row.job_title as string) ?? "",
    deletedAt: (row.deleted_at as string | null) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    accountType: (row.account_type as Profile["accountType"]) ?? null,
    onboardingCompleted: (row.onboarding_completed as boolean) === true,
    onboardingStep: (row.onboarding_step as string) || "done",
    firstName: (row.first_name as string) ?? "",
    lastName: (row.last_name as string) ?? "",
    phone: (row.phone as string) ?? "",
    handle: (row.handle as string) ?? "",
    onboarding: (row.onboarding as Profile["onboarding"]) || {},
  });
}

function mapWorkspace(row: Record<string, unknown>): Workspace {
  return {
    id: row.id as string,
    ownerId: row.owner_id as string,
    name: row.name as string,
    slug: row.slug as string,
    timezone: (row.timezone as string) ?? "UTC",
    plan: (row.plan as string) ?? "Pre-alpha",
    planStatus: (row.plan_status as string) ?? "active",
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function mapMember(row: Record<string, unknown>): WorkspaceMember {
  return {
    workspaceId: row.workspace_id as string,
    userId: row.user_id as string,
    email: (row.email as string) ?? "",
    role: row.role as WorkspaceMember["role"],
    createdAt: row.created_at as string,
  };
}

function mapInvite(row: Record<string, unknown>): WorkspaceInvite {
  return {
    id: row.id as string,
    workspaceId: row.workspace_id as string,
    email: row.email as string,
    role: row.role as WorkspaceInvite["role"],
    token: row.token as string,
    expiresAt: row.expires_at as string,
    acceptedAt: (row.accepted_at as string | null) ?? null,
    createdAt: row.created_at as string,
  };
}

function mapApiKey(row: Record<string, unknown>): ApiKeyRecord {
  return {
    id: row.id as string,
    workspaceId: row.workspace_id as string,
    name: row.name as string,
    keyPrefix: row.key_prefix as string,
    keyHash: row.key_hash as string,
    scopes: (row.scopes as string[]) ?? [],
    createdAt: row.created_at as string,
    lastUsedAt: (row.last_used_at as string | null) ?? null,
    revokedAt: (row.revoked_at as string | null) ?? null,
  };
}

function mapUsage(row: Record<string, unknown>): UsagePeriod {
  return {
    workspaceId: row.workspace_id as string,
    period: row.period as string,
    requests: Number(row.requests),
    tokens: Number(row.tokens),
    evals: Number(row.evals),
  };
}

// ——— Supabase implementations ———

async function sbGetProfile(userId: string): Promise<Profile | null> {
  const sb = createServiceClient();
  const { data } = await sb.from("profiles").select("*").eq("user_id", userId).single();
  if (!data) return null;
  return mapProfile(data);
}

async function sbUpsertProfile(profile: Profile): Promise<Profile> {
  const sb = createServiceClient();
  const t = now();
  const { data, error } = await sb
    .from("profiles")
    .upsert({
      user_id: profile.userId,
      email: profile.email,
      display_name: profile.displayName,
      job_title: profile.jobTitle,
      deleted_at: profile.deletedAt,
      created_at: profile.createdAt || t,
      updated_at: t,
      account_type: profile.accountType,
      onboarding_completed: profile.onboardingCompleted,
      onboarding_step: profile.onboardingStep,
      first_name: profile.firstName,
      last_name: profile.lastName,
      phone: profile.phone,
      handle: profile.handle,
      onboarding: profile.onboarding,
    } as any)
    .select()
    .single();
  if (error) throw error;
  return mapProfile(data);
}

async function sbGetWorkspaceForUser(
  user: { userId: string; email: string; name: string }
): Promise<{
  profile: Profile;
  workspace: Workspace;
  members: WorkspaceMember[];
  invites: WorkspaceInvite[];
  apiKeys: ApiKeyRecord[];
  usage: UsagePeriod;
}> {
  const t = now();
  const sb = createServiceClient();
  const userId = user.userId;

  let profile = await sbGetProfile(userId);

  if (profile?.deletedAt) {
    throw new AccountDeletedError(userId);
  }

  if (!profile) {
    const nameParts = (user.name || "").trim().split(/\s+/);
    profile = {
      userId,
      email: user.email,
      displayName: user.name,
      jobTitle: "",
      deletedAt: null,
      createdAt: t,
      updatedAt: t,
      accountType: null,
      onboardingCompleted: true,
      onboardingStep: "done",
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      phone: "",
      handle: "",
      onboarding: {},
    };
    profile = await sbUpsertProfile(profile);
  } else {
    profile = normalizeProfile(profile);
    if (profile.email !== user.email || !("onboardingCompleted" in profile)) {
      profile.email = user.email;
      profile = await sbUpsertProfile(profile);
    }
  }

  let workspace: Workspace | null = null;

  const { data: uw } = await sb
    .from("user_workspaces")
    .select("workspace_id")
    .eq("user_id", userId)
    .single();
  if (uw) {
    const { data: ws } = await sb
      .from("workspaces")
      .select("*")
      .eq("id", uw.workspace_id)
      .single();
    if (ws) workspace = mapWorkspace(ws);
  }

  if (!workspace) {
    const { data: owned } = await sb
      .from("workspaces")
      .select("*")
      .eq("owner_id", userId)
      .limit(1);
    if (owned?.length) {
      workspace = mapWorkspace(owned[0]);
      await sb.from("user_workspaces").upsert({
        user_id: userId,
        workspace_id: workspace.id,
        updated_at: t,
      });
    }
  }

  if (!workspace) {
    const workspaceId = id("ws");
    let slug = slugify(user.name.split(" ")[0] || "team");
    const { data: existing } = await sb
      .from("workspaces")
      .select("slug")
      .eq("slug", slug)
      .limit(1);
    if (existing?.length) slug = `${slug}-${randomBytes(2).toString("hex")}`;

    const { data: ws } = await sb
      .from("workspaces")
      .insert({
        id: workspaceId,
        owner_id: userId,
        name: `${user.name.split(" ")[0] || "My"}'s Workspace`,
        slug,
        timezone: "UTC",
        plan: "Pre-alpha",
        plan_status: "active",
        created_at: t,
        updated_at: t,
      })
      .select()
      .single();
    if (!ws) throw new Error("Failed to create workspace");
    workspace = mapWorkspace(ws);

    await sb.from("user_workspaces").insert({
      user_id: userId,
      workspace_id: workspaceId,
      updated_at: t,
    });

    await sb.from("workspace_members").insert({
      workspace_id: workspaceId,
      user_id: userId,
      email: user.email,
      role: "owner",
      created_at: t,
    });
  }

  const wsId = workspace.id;

  const period = periodKey();
  const { data: up } = await sb
    .from("usage_periods")
    .select("*")
    .eq("workspace_id", wsId)
    .eq("period", period)
    .single();
  let usage: UsagePeriod;
  if (!up) {
    const { data: created } = await sb
      .from("usage_periods")
      .insert({
        workspace_id: wsId,
        period,
        requests: 0,
        tokens: 0,
        evals: 0,
      })
      .select()
      .single();
    usage = mapUsage(created!);
  } else {
    usage = mapUsage(up);
  }

  const { data: members } = await sb
    .from("workspace_members")
    .select("*")
    .eq("workspace_id", wsId);
  const { data: invites } = await sb
    .from("workspace_invites")
    .select("*")
    .eq("workspace_id", wsId)
    .is("accepted_at", null);
  const { data: apiKeys } = await sb
    .from("api_keys")
    .select("*")
    .eq("workspace_id", wsId)
    .is("revoked_at", null);

  return {
    profile,
    workspace,
    members: (members || []).map(mapMember),
    invites: (invites || []).map(mapInvite),
    apiKeys: (apiKeys || []).map(mapApiKey),
    usage,
  };
}

async function sbSoftDeleteAccount(userId: string): Promise<void> {
  const sb = createServiceClient();
  const t = now();
  await sb.from("profiles").update({ deleted_at: t, updated_at: t }).eq("user_id", userId);

  const { data: workspaces } = await sb
    .from("workspaces")
    .select("id")
    .eq("owner_id", userId);
  for (const ws of workspaces || []) {
    await sb.from("api_keys").update({ revoked_at: t }).eq("workspace_id", ws.id).is("revoked_at", null);
  }
}

async function sbCreateApiKey(params: {
  workspaceId: string;
  name: string;
  keyPrefix: string;
  keyHash: string;
  scopes: string[];
}): Promise<ApiKeyRecord> {
  const sb = createServiceClient();
  const t = now();
  const { data, error } = await sb
    .from("api_keys")
    .insert({
      id: id("ak"),
      workspace_id: params.workspaceId,
      name: params.name,
      key_prefix: params.keyPrefix,
      key_hash: params.keyHash,
      scopes: params.scopes,
      created_at: t,
    })
    .select()
    .single();
  if (error) throw error;
  return mapApiKey(data);
}

async function sbRequireMembership(
  workspaceId: string,
  userId: string
): Promise<WorkspaceMember | null> {
  const sb = createServiceClient();
  const { data } = await sb
    .from("workspace_members")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId)
    .single();
  if (!data) return null;
  return mapMember(data);
}

async function sbRevokeApiKey(workspaceId: string, id: string): Promise<void> {
  const sb = createServiceClient();
  const { error } = await sb
    .from("api_keys")
    .update({ revoked_at: now() })
    .eq("workspace_id", workspaceId)
    .eq("id", id);
  if (error) throw error;
}

async function sbUpdateProfile(
  userId: string,
  updates: { displayName?: string; jobTitle?: string }
): Promise<Profile> {
  const sb = createServiceClient();
  const patch: Record<string, unknown> = { updated_at: now() };
  if (updates.displayName !== undefined) patch.display_name = updates.displayName;
  if (updates.jobTitle !== undefined) patch.job_title = updates.jobTitle;
  const { data, error } = await sb
    .from("profiles")
    .update(patch as any)
    .eq("user_id", userId)
    .select()
    .single();
  if (error || !data) throw new Error("Profile not found");
  return mapProfile(data);
}

async function sbCreateInvite(params: {
  workspaceId: string;
  email: string;
  role: "admin" | "member";
}): Promise<WorkspaceInvite> {
  const sb = createServiceClient();
  const t = now();
  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await sb
    .from("workspace_invites")
    .insert({
      id: id("inv"),
      workspace_id: params.workspaceId,
      email: params.email,
      role: params.role,
      token,
      expires_at: expiresAt,
      accepted_at: null,
      created_at: t,
    })
    .select()
    .single();
  if (error) throw error;
  return mapInvite(data);
}

async function sbDeleteInvite(workspaceId: string, id: string): Promise<void> {
  const sb = createServiceClient();
  const { error } = await sb
    .from("workspace_invites")
    .delete()
    .eq("workspace_id", workspaceId)
    .eq("id", id);
  if (error) throw error;
}

async function sbRemoveMember(workspaceId: string, userId: string): Promise<void> {
  const sb = createServiceClient();
  await sb
    .from("workspace_members")
    .delete()
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId);
  await sb
    .from("user_workspaces")
    .delete()
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId);
}

async function sbUpdateWorkspace(
  id: string,
  updates: { name?: string; slug?: string; timezone?: string }
): Promise<Workspace> {
  const sb = createServiceClient();
  const patch: Record<string, unknown> = { updated_at: now() };
  if (updates.name !== undefined) patch.name = updates.name;
  if (updates.slug !== undefined) {
    const { data: existing } = await sb
      .from("workspaces")
      .select("id")
      .eq("slug", updates.slug)
      .neq("id", id)
      .limit(1);
    if (existing?.length) throw new Error("Slug is already taken");
    patch.slug = updates.slug;
  }
  if (updates.timezone !== undefined) patch.timezone = updates.timezone;
  const { data, error } = await sb
    .from("workspaces")
    .update(patch as any)
    .eq("id", id)
    .select()
    .single();
  if (error || !data) throw new Error("Workspace not found");
  return mapWorkspace(data);
}

async function sbGetUsageHistory(
  workspaceId: string,
  months: number
): Promise<UsagePeriod[]> {
  const sb = createServiceClient();
  const { data } = await sb
    .from("usage_periods")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("period", { ascending: false })
    .limit(months);
  return (data || []).map(mapUsage);
}

async function sbFindApiKeyByHash(hash: string): Promise<ApiKeyRecord | null> {
  const sb = createServiceClient();
  const { data } = await sb
    .from("api_keys")
    .select("*")
    .eq("key_hash", hash)
    .is("revoked_at", null)
    .single();
  if (!data) return null;
  return mapApiKey(data);
}

async function sbTouchApiKeyLastUsed(id: string): Promise<void> {
  const sb = createServiceClient();
  await sb
    .from("api_keys")
    .update({ last_used_at: now() } as any)
    .eq("id", id);
}

// ——— JSON backend implementations ———

async function jsonGetProfile(userId: string): Promise<Profile | null> {
  return withStore((store) => {
    return store.profiles[userId] ?? null;
  });
}

async function jsonUpsertProfile(profile: Profile): Promise<Profile> {
  return withStore(
    (store) => {
      store.profiles[profile.userId] = normalizeProfile(profile);
      return store.profiles[profile.userId];
    },
    { mutate: true }
  );
}

async function jsonGetWorkspaceForUser(
  user: { userId: string; email: string; name: string }
): Promise<{
  profile: Profile;
  workspace: Workspace;
  members: WorkspaceMember[];
  invites: WorkspaceInvite[];
  apiKeys: ApiKeyRecord[];
  usage: UsagePeriod;
}> {
  return withStore(
    (store) => {
      const t = now();
      let profile = store.profiles[user.userId];

      if (profile?.deletedAt) {
        throw new AccountDeletedError(user.userId);
      }

      if (!profile) {
        const nameParts = (user.name || "").trim().split(/\s+/);
        profile = {
          userId: user.userId,
          email: user.email,
          displayName: user.name,
          jobTitle: "",
          deletedAt: null,
          createdAt: t,
          updatedAt: t,
          accountType: null,
          onboardingCompleted: true,
          onboardingStep: "done",
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          phone: "",
          handle: "",
          onboarding: {},
        };
        store.profiles[user.userId] = profile;
      } else {
        const isLegacy = !("onboardingCompleted" in profile);
        profile = normalizeProfile({
          ...profile,
          email: user.email || profile.email,
        });
        if (isLegacy) profile.onboardingCompleted = true;
        store.profiles[user.userId] = profile;
      }

      let workspaceId = store.userWorkspace[user.userId];
      let workspace = workspaceId ? store.workspaces[workspaceId] : undefined;

      if (!workspace) {
        const owned = Object.values(store.workspaces).find(
          (w) => w.ownerId === user.userId
        );
        if (owned) {
          workspace = owned;
          workspaceId = owned.id;
          store.userWorkspace[user.userId] = owned.id;
        }
      }

      if (!workspace) {
        workspaceId = id("ws");
        let slug = slugify(user.name.split(" ")[0] || "team");
        const taken = new Set(Object.values(store.workspaces).map((w) => w.slug));
        if (taken.has(slug)) slug = `${slug}-${randomBytes(2).toString("hex")}`;
        workspace = {
          id: workspaceId,
          ownerId: user.userId,
          name: `${user.name.split(" ")[0] || "My"}'s Workspace`,
          slug,
          timezone: "UTC",
          plan: "Pre-alpha",
          planStatus: "active",
          createdAt: t,
          updatedAt: t,
        };
        store.workspaces[workspaceId] = workspace;
        store.userWorkspace[user.userId] = workspaceId;
        store.members.push({
          workspaceId,
          userId: user.userId,
          email: user.email,
          role: "owner",
          createdAt: t,
        });
      }

      const period = periodKey();
      let usage = store.usage.find(
        (u) => u.workspaceId === workspace!.id && u.period === period
      );
      if (!usage) {
        usage = {
          workspaceId: workspace!.id,
          period,
          requests: 0,
          tokens: 0,
          evals: 0,
        };
        store.usage.push(usage);
      }

      const members = store.members.filter((m) => m.workspaceId === workspace!.id);
      const invites = store.invites.filter(
        (i) => i.workspaceId === workspace!.id && !i.acceptedAt
      );
      const apiKeys = store.apiKeys.filter(
        (k) => k.workspaceId === workspace!.id && !k.revokedAt
      );

      return { profile, workspace: workspace!, members, invites, apiKeys, usage };
    },
    { mutate: true }
  );
}

async function jsonSoftDeleteAccount(userId: string): Promise<void> {
  await withStore(
    (store) => {
      const t = now();
      const profile = store.profiles[userId];
      if (profile) profile.deletedAt = t;

      const ownedWorkspaceIds = Object.values(store.workspaces)
        .filter((w) => w.ownerId === userId)
        .map((w) => w.id);
      for (const key of store.apiKeys) {
        if (ownedWorkspaceIds.includes(key.workspaceId) && !key.revokedAt) {
          key.revokedAt = t;
        }
      }
      return undefined;
    },
    { mutate: true }
  );
}

async function jsonCreateApiKey(params: {
  workspaceId: string;
  name: string;
  keyPrefix: string;
  keyHash: string;
  scopes: string[];
}): Promise<ApiKeyRecord> {
  return withStore(
    (store) => {
      const record: ApiKeyRecord = {
        id: id("ak"),
        workspaceId: params.workspaceId,
        name: params.name,
        keyPrefix: params.keyPrefix,
        keyHash: params.keyHash,
        scopes: params.scopes,
        createdAt: now(),
        lastUsedAt: null,
        revokedAt: null,
      };
      store.apiKeys.push(record);
      return record;
    },
    { mutate: true }
  );
}

async function jsonRequireMembership(
  workspaceId: string,
  userId: string
): Promise<WorkspaceMember | null> {
  return withStore((store) => {
    return (
      store.members.find(
        (m) => m.workspaceId === workspaceId && m.userId === userId
      ) ?? null
    );
  });
}

async function jsonRevokeApiKey(workspaceId: string, id: string): Promise<void> {
  await withStore(
    (store) => {
      const key = store.apiKeys.find(
        (k) => k.workspaceId === workspaceId && k.id === id && !k.revokedAt
      );
      if (!key) throw new Error("Not found");
      key.revokedAt = now();
    },
    { mutate: true }
  );
}

async function jsonUpdateProfile(
  userId: string,
  updates: { displayName?: string; jobTitle?: string }
): Promise<Profile> {
  return withStore(
    (store) => {
      const profile = store.profiles[userId];
      if (!profile) throw new Error("Profile not found");
      if (updates.displayName !== undefined) profile.displayName = updates.displayName;
      if (updates.jobTitle !== undefined) profile.jobTitle = updates.jobTitle;
      profile.updatedAt = now();
      store.profiles[userId] = profile;
      return profile;
    },
    { mutate: true }
  );
}

async function jsonCreateInvite(params: {
  workspaceId: string;
  email: string;
  role: "admin" | "member";
}): Promise<WorkspaceInvite> {
  return withStore(
    (store) => {
      const t = now();
      const invite: WorkspaceInvite = {
        id: id("inv"),
        workspaceId: params.workspaceId,
        email: params.email,
        role: params.role,
        token: randomBytes(24).toString("hex"),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        acceptedAt: null,
        createdAt: t,
      };
      store.invites.push(invite);
      return invite;
    },
    { mutate: true }
  );
}

async function jsonDeleteInvite(workspaceId: string, id: string): Promise<void> {
  await withStore(
    (store) => {
      const idx = store.invites.findIndex(
        (i) => i.workspaceId === workspaceId && i.id === id
      );
      if (idx === -1) throw new Error("Not found");
      store.invites.splice(idx, 1);
    },
    { mutate: true }
  );
}

async function jsonRemoveMember(workspaceId: string, userId: string): Promise<void> {
  await withStore(
    (store) => {
      store.members = store.members.filter(
        (m) => !(m.workspaceId === workspaceId && m.userId === userId)
      );
      if (store.userWorkspace[userId] === workspaceId) {
        delete store.userWorkspace[userId];
      }
    },
    { mutate: true }
  );
}

async function jsonUpdateWorkspace(
  id: string,
  updates: { name?: string; slug?: string; timezone?: string }
): Promise<Workspace> {
  return withStore(
    (store) => {
      const workspace = store.workspaces[id];
      if (!workspace) throw new Error("Workspace not found");
      if (updates.name !== undefined) workspace.name = updates.name;
      if (updates.slug !== undefined) {
        const taken = Object.values(store.workspaces).some(
          (w) => w.slug === updates.slug && w.id !== id
        );
        if (taken) throw new Error("Slug is already taken");
        workspace.slug = updates.slug;
      }
      if (updates.timezone !== undefined) workspace.timezone = updates.timezone;
      workspace.updatedAt = now();
      store.workspaces[id] = workspace;
      return workspace;
    },
    { mutate: true }
  );
}

async function jsonGetUsageHistory(
  workspaceId: string,
  months: number
): Promise<UsagePeriod[]> {
  return withStore((store) => {
    return store.usage
      .filter((u) => u.workspaceId === workspaceId)
      .sort((a, b) => b.period.localeCompare(a.period))
      .slice(0, months);
  });
}

async function jsonFindApiKeyByHash(hash: string): Promise<ApiKeyRecord | null> {
  return withStore((store) => {
    return (
      store.apiKeys.find((k) => k.keyHash === hash && !k.revokedAt) ?? null
    );
  });
}

async function jsonTouchApiKeyLastUsed(id: string): Promise<void> {
  await withStore(
    (store) => {
      const key = store.apiKeys.find((k) => k.id === id);
      if (key) key.lastUsedAt = now();
    },
    { mutate: true }
  );
}

// ——— Public API (routes to the correct backend) ———

export async function getProfile(userId: string): Promise<Profile | null> {
  return useSupabase() ? sbGetProfile(userId) : jsonGetProfile(userId);
}

export async function upsertProfile(profile: Profile): Promise<Profile> {
  return useSupabase() ? sbUpsertProfile(profile) : jsonUpsertProfile(profile);
}

export async function getWorkspaceForUser(
  user: { userId: string; email: string; name: string }
) {
  return useSupabase()
    ? sbGetWorkspaceForUser(user)
    : jsonGetWorkspaceForUser(user);
}

export async function softDeleteAccount(userId: string): Promise<void> {
  return useSupabase()
    ? sbSoftDeleteAccount(userId)
    : jsonSoftDeleteAccount(userId);
}

export async function createApiKey(params: {
  workspaceId: string;
  name: string;
  keyPrefix: string;
  keyHash: string;
  scopes: string[];
}): Promise<ApiKeyRecord> {
  return useSupabase()
    ? sbCreateApiKey(params)
    : jsonCreateApiKey(params);
}

export async function requireMembership(
  workspaceId: string,
  userId: string
): Promise<WorkspaceMember | null> {
  return useSupabase()
    ? sbRequireMembership(workspaceId, userId)
    : jsonRequireMembership(workspaceId, userId);
}

export async function revokeApiKey(
  workspaceId: string,
  id: string
): Promise<void> {
  return useSupabase()
    ? sbRevokeApiKey(workspaceId, id)
    : jsonRevokeApiKey(workspaceId, id);
}

export async function updateProfile(
  userId: string,
  updates: { displayName?: string; jobTitle?: string }
): Promise<Profile> {
  return useSupabase()
    ? sbUpdateProfile(userId, updates)
    : jsonUpdateProfile(userId, updates);
}

export async function createInvite(params: {
  workspaceId: string;
  email: string;
  role: "admin" | "member";
}): Promise<WorkspaceInvite> {
  return useSupabase()
    ? sbCreateInvite(params)
    : jsonCreateInvite(params);
}

export async function deleteInvite(
  workspaceId: string,
  id: string
): Promise<void> {
  return useSupabase()
    ? sbDeleteInvite(workspaceId, id)
    : jsonDeleteInvite(workspaceId, id);
}

export async function removeMember(
  workspaceId: string,
  userId: string
): Promise<void> {
  return useSupabase()
    ? sbRemoveMember(workspaceId, userId)
    : jsonRemoveMember(workspaceId, userId);
}

export async function updateWorkspace(
  id: string,
  updates: { name?: string; slug?: string; timezone?: string }
): Promise<Workspace> {
  return useSupabase()
    ? sbUpdateWorkspace(id, updates)
    : jsonUpdateWorkspace(id, updates);
}

export async function getUsageHistory(
  workspaceId: string,
  months: number
): Promise<UsagePeriod[]> {
  return useSupabase()
    ? sbGetUsageHistory(workspaceId, months)
    : jsonGetUsageHistory(workspaceId, months);
}

export async function findApiKeyByHash(hash: string): Promise<ApiKeyRecord | null> {
  return useSupabase()
    ? sbFindApiKeyByHash(hash)
    : jsonFindApiKeyByHash(hash);
}

export async function touchApiKeyLastUsed(id: string): Promise<void> {
  return useSupabase()
    ? sbTouchApiKeyLastUsed(id)
    : jsonTouchApiKeyLastUsed(id);
}
