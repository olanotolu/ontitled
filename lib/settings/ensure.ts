import { getWorkspaceForUser } from "./repository";
import type {
  ApiKeyRecord,
  Profile,
  UsagePeriod,
  Workspace,
  WorkspaceInvite,
  WorkspaceMember,
} from "./types";
import type { AuthUser } from "./auth";

export {
  hashApiKey,
  generateApiKeySecret,
  id,
  now,
  periodKey,
  slugify,
} from "./utils";

export async function ensureUserWorkspace(user: AuthUser): Promise<{
  profile: Profile;
  workspace: Workspace;
  members: WorkspaceMember[];
  invites: WorkspaceInvite[];
  apiKeys: ApiKeyRecord[];
  usage: UsagePeriod;
}> {
  return getWorkspaceForUser({
    userId: user.userId,
    email: user.email,
    name: user.name,
  });
}
