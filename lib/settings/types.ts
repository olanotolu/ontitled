export type MemberRole = "owner" | "admin" | "member";

export type AccountType = "individual" | "business";

export type OnboardingBusiness = {
  legalName: string;
  displayName: string;
  handle: string;
  website: string;
  registeredDifferentName: boolean | null;
};

export type OnboardingOwner = {
  name: string;
  percent: number;
};

export type OnboardingIdentity = {
  role: string;
  useCase: string;
};

export type OnboardingData = {
  business?: OnboardingBusiness;
  ownership?: OnboardingOwner[];
  identity?: OnboardingIdentity;
};

export type Profile = {
  userId: string;
  email: string;
  displayName: string;
  jobTitle: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  // onboarding
  accountType: AccountType | null;
  onboardingCompleted: boolean;
  onboardingStep: string;
  firstName: string;
  lastName: string;
  phone: string;
  handle: string;
  onboarding: OnboardingData;
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
  period: string;
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
  userWorkspace: Record<string, string>;
};

export function normalizeProfile(p: Profile): Profile {
  return {
    ...p,
    accountType: p.accountType ?? null,
    onboardingCompleted: p.onboardingCompleted === true,
    onboardingStep: p.onboardingStep || "account-type",
    firstName: p.firstName || "",
    lastName: p.lastName || "",
    phone: p.phone || "",
    handle: p.handle || "",
    onboarding: p.onboarding || {},
  };
}
