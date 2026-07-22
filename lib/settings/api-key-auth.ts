import { NextResponse } from "next/server";
import { hashApiKey } from "./utils";
import { findApiKeyByHash, getWorkspaceForUser, touchApiKeyLastUsed } from "./repository";
import type { AuthUser } from "./auth";
import { requireActiveUser } from "./auth";

export type AuthResult =
  | { mode: "session"; user: AuthUser; workspaceId: string }
  | { mode: "apiKey"; userId: string; workspaceId: string; scopes: string[] }
  | { error: NextResponse };

export async function authenticateRequest(req: Request): Promise<AuthResult> {
  const header = req.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    const token = header.slice(7);
    return authenticateApiKey(token);
  }

  const result = await requireActiveUser();
  if ("error" in result) return result;

  const bundle = await getWorkspaceForUser(result.user);
  return { mode: "session", user: result.user, workspaceId: bundle.workspace.id };
}

async function authenticateApiKey(token: string): Promise<AuthResult> {
  const keyHash = hashApiKey(token);
  const key = await findApiKeyByHash(keyHash);

  if (!key) {
    return {
      error: NextResponse.json(
        { error: "Invalid or revoked API key" },
        { status: 401 }
      ),
    };
  }

  if (!key.scopes.includes("write")) {
    return {
      error: NextResponse.json(
        { error: "API key requires write scope" },
        { status: 403 }
      ),
    };
  }

  touchApiKeyLastUsed(key.id).catch(() => {});

  return {
    mode: "apiKey",
    userId: key.workspaceId, // workspace_id links to the workspace's owner
    workspaceId: key.workspaceId,
    scopes: key.scopes,
  };
}
