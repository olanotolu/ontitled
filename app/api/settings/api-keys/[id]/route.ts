import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { revokeApiKey, requireMembership } from "@/lib/settings/repository";

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const { workspace } = await ensureUserWorkspace(auth.user);
  const { id } = await ctx.params;

  try {
    const member = await requireMembership(workspace.id, auth.user.userId);
    if (!member) throw new Error("Forbidden");
    await revokeApiKey(workspace.id, id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Revoke failed";
    const status = msg === "Forbidden" ? 403 : 404;
    return NextResponse.json({ error: msg }, { status });
  }
}
