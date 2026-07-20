import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { withStore } from "@/lib/settings/store";

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const { workspace } = await ensureUserWorkspace(auth.user);
  const { id } = await ctx.params;

  try {
    await withStore(
      (store) => {
        const member = store.members.find(
          (m) => m.workspaceId === workspace.id && m.userId === auth.user.userId
        );
        if (!member || (member.role !== "owner" && member.role !== "admin")) {
          throw new Error("Forbidden");
        }
        const before = store.invites.length;
        store.invites = store.invites.filter(
          (i) => !(i.id === id && i.workspaceId === workspace.id)
        );
        if (store.invites.length === before) throw new Error("Invite not found");
      },
      { mutate: true }
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Revoke failed";
    const status = msg === "Forbidden" ? 403 : 404;
    return NextResponse.json({ error: msg }, { status });
  }
}
