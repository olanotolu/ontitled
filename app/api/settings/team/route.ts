import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const data = await ensureUserWorkspace(auth.user);
  return NextResponse.json({
    workspaceId: data.workspace.id,
    members: data.members,
    invites: data.invites.map((i) => ({
      id: i.id,
      email: i.email,
      role: i.role,
      expiresAt: i.expiresAt,
      createdAt: i.createdAt,
      inviteUrl: `/settings/team?invite=${i.token}`,
    })),
  });
}
