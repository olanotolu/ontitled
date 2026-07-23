import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { removeMember, requireMembership } from "@/lib/settings/repository";

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ userId: string }> }
) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const { workspace } = await ensureUserWorkspace(auth.user);
  const { userId } = await ctx.params;

  try {
    const actor = await requireMembership(workspace.id, auth.user.userId);
    if (!actor || (actor.role !== "owner" && actor.role !== "admin")) {
      throw new Error("Forbidden");
    }
    await removeMember(workspace.id, userId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Remove failed";
    const status = msg === "Forbidden" ? 403 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
