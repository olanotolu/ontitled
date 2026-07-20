import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace, now, slugify } from "@/lib/settings/ensure";
import { withStore } from "@/lib/settings/store";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const data = await ensureUserWorkspace(auth.user);
  return NextResponse.json({ workspace: data.workspace });
}

export async function PATCH(req: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const { workspace } = await ensureUserWorkspace(auth.user);

  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    slug?: string;
    timezone?: string;
  };

  try {
    const updated = await withStore(
      (store) => {
        const w = store.workspaces[workspace.id];
        if (!w) throw new Error("Workspace not found");
        const member = store.members.find(
          (m) => m.workspaceId === w.id && m.userId === auth.user.userId
        );
        if (!member || (member.role !== "owner" && member.role !== "admin")) {
          throw new Error("Forbidden");
        }
        if (typeof body.name === "string") {
          w.name = body.name.trim().slice(0, 80) || w.name;
        }
        if (typeof body.slug === "string") {
          const next = slugify(body.slug);
          const clash = Object.values(store.workspaces).some(
            (x) => x.slug === next && x.id !== w.id
          );
          if (clash) throw new Error("Slug already taken");
          w.slug = next;
        }
        if (typeof body.timezone === "string" && body.timezone.trim()) {
          w.timezone = body.timezone.trim().slice(0, 64);
        }
        w.updatedAt = now();
        store.workspaces[w.id] = w;
        return w;
      },
      { mutate: true }
    );
    return NextResponse.json({ workspace: updated });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Update failed";
    const status = msg === "Forbidden" ? 403 : msg.includes("taken") ? 409 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
