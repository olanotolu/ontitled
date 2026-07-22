import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { createInvite, requireMembership } from "@/lib/settings/repository";
import { sendInviteEmail } from "@/lib/email/send";
import type { MemberRole } from "@/lib/settings/types";

export async function POST(req: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const { workspace } = await ensureUserWorkspace(auth.user);

  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    role?: Exclude<MemberRole, "owner">;
  };
  const email = (body.email || "").trim().toLowerCase();
  const role = body.role === "admin" ? "admin" : "member";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  try {
    const member = await requireMembership(workspace.id, auth.user.userId);
    if (!member || (member.role !== "owner" && member.role !== "admin")) {
      throw new Error("Forbidden");
    }
    const invite = await createInvite({
      workspaceId: workspace.id,
      email,
      role: role as "admin" | "member",
    });

    const base =
      process.env.APP_BASE_URL ||
      process.env.AUTH0_BASE_URL ||
      "https://www.ontitled.com";
    const inviteUrl = `${base.replace(/\/$/, "")}/invites/${invite.token}`;

    sendInviteEmail({
      to: invite.email,
      inviteUrl,
      workspaceName: workspace.name,
    }).catch(() => {});

    return NextResponse.json({
      invite: {
        id: invite.id,
        email: invite.email,
        role: invite.role,
        expiresAt: invite.expiresAt,
        createdAt: invite.createdAt,
        inviteUrl,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invite failed";
    const status = msg === "Forbidden" ? 403 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
