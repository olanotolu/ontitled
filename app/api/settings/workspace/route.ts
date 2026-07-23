import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { updateWorkspace, requireMembership } from "@/lib/settings/repository";

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
    const member = await requireMembership(workspace.id, auth.user.userId);
    if (!member || (member.role !== "owner" && member.role !== "admin")) {
      throw new Error("Forbidden");
    }
    const updated = await updateWorkspace(workspace.id, {
      name: body.name,
      slug: body.slug,
      timezone: body.timezone,
    });
    return NextResponse.json({ workspace: updated });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Update failed";
    const status = msg === "Forbidden" ? 403 : msg.includes("taken") ? 409 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
