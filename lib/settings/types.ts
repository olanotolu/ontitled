export type MemberRole = "owner" | "admin" | "member";

export type Profile = {
  userId: string;
  email: string;
  displayName: string;
  jobTitle: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Workspace = {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  timezone: string;
  plan: string;
  planStatus: string;
  createdAt: string;
  updatedAt: string;
};

export type WorkspaceMember = {
  workspaceId: string;
  userId: string;
  email: string;
  role: MemberRole;
  createdAt: string;
};

export type WorkspaceInvite = {
  id: string;
  workspaceId: string;
  email: string;
  role: Exclude<MemberRole, "owner">;
  token: string;
  expiresAt: string;
  acceptedAt: string | null;
  createdAt: string;
};

export type ApiKeyRecord = {
  id: string;
  workspaceId: string;
  name: string;
  keyPrefix: string;
  keyHash: string;
  scopes: string[];
  createdAt: string;
  lastUsedAt: string | null;
  revokedAt: string | null;
};

export type UsagePeriod = {
  workspaceId: string;
  period: string; // YYYY-MM
  requests: number;
  tokens: number;
  evals: number;
};

export type SettingsStoreData = {
  profiles: Record<string, Profile>;
  workspaces: Record<string, Workspace>;
  members: WorkspaceMember[];
  invites: WorkspaceInvite[];
  apiKeys: ApiKeyRecord[];
  usage: UsagePeriod[];
  userWorkspace: Record<string, string>; // userId -> default workspaceId
};
