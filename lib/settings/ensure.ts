import { createHash, randomBytes } from "node:crypto";
import { withStore } from "./store";
import type {
  ApiKeyRecord,
  Profile,
  UsagePeriod,
  Workspace,
  WorkspaceInvite,
  WorkspaceMember,
} from "./types";
import { normalizeProfile } from "./types";
import type { AuthUser } from "./auth";

function now() {
  return new Date().toISOString();
}

function id(prefix: string) {
  return `${prefix}_${randomBytes(12).toString("hex")}`;
}

function slugify(input: string) {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return base || "workspace";
}

function periodKey(d = new Date()) {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function hashApiKey(secret: string) {
  return createHash("sha256").update(secret).digest("hex");
}

export function generateApiKeySecret() {
  const raw = randomBytes(24).toString("base64url");
  const secret = `ot_live_${raw}`;
  const keyPrefix = secret.slice(0, 14);
  return { secret, keyPrefix, keyHash: hashApiKey(secret) };
}

export async function ensureUserWorkspace(user: AuthUser): Promise<{
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
      if (!profile || profile.deletedAt) {
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
          onboardingCompleted: false,
          onboardingStep: "account-type",
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
        // Profiles created before onboarding feature skip the wizard
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
          workspaceId: workspace.id,
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

      return { profile, workspace, members, invites, apiKeys, usage };
    },
    { mutate: true }
  );
}

export { id, now, periodKey, slugify };
