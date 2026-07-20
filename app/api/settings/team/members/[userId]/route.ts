import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { withStore } from "@/lib/settings/store";

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ userId: string }> }
) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const { workspace } = await ensureUserWorkspace(auth.user);
  const { userId } = await ctx.params;

  try {
    await withStore(
      (store) => {
        const actor = store.members.find(
          (m) => m.workspaceId === workspace.id && m.userId === auth.user.userId
        );
        if (!actor || (actor.role !== "owner" && actor.role !== "admin")) {
          throw new Error("Forbidden");
        }
        const target = store.members.find(
          (m) => m.workspaceId === workspace.id && m.userId === userId
        );
        if (!target) throw new Error("Member not found");
        if (target.role === "owner") throw new Error("Cannot remove workspace owner");
        store.members = store.members.filter(
          (m) => !(m.workspaceId === workspace.id && m.userId === userId)
        );
      },
      { mutate: true }
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Remove failed";
    const status = msg === "Forbidden" ? 403 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
