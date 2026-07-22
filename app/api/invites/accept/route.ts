import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/settings/auth";
import { acceptInvite } from "@/lib/settings/repository";

export async function POST(req: Request) {
  const auth = await requireActiveUser();
  if ("error" in auth) return auth.error;

  let token: string;
  try {
    const body = (await req.json()) as { token?: string };
    token = (body.token || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    const invite = await acceptInvite(token, auth.user.userId, auth.user.email);
    return NextResponse.json({
      ok: true,
      workspaceId: invite.workspaceId,
      role: invite.role,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Accept failed";
    const status = msg.includes("expired") ? 410 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
