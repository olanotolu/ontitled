import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace, id, now } from "@/lib/settings/ensure";
import { withStore } from "@/lib/settings/store";
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
    const invite = await withStore(
      (store) => {
        const member = store.members.find(
          (m) => m.workspaceId === workspace.id && m.userId === auth.user.userId
        );
        if (!member || (member.role !== "owner" && member.role !== "admin")) {
          throw new Error("Forbidden");
        }
        if (
          store.members.some(
            (m) => m.workspaceId === workspace.id && m.email.toLowerCase() === email
          )
        ) {
          throw new Error("User is already a member");
        }
        // replace existing pending invite for same email
        store.invites = store.invites.filter(
          (i) =>
            !(
              i.workspaceId === workspace.id &&
              i.email.toLowerCase() === email &&
              !i.acceptedAt
            )
        );
        const row = {
          id: id("inv"),
          workspaceId: workspace.id,
          email,
          role: role as "admin" | "member",
          token: randomBytes(18).toString("base64url"),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          acceptedAt: null as string | null,
          createdAt: now(),
        };
        store.invites.push(row);
        return row;
      },
      { mutate: true }
    );

    const base =
      process.env.APP_BASE_URL ||
      process.env.AUTH0_BASE_URL ||
      "https://www.ontitled.com";
    return NextResponse.json({
      invite: {
        id: invite.id,
        email: invite.email,
        role: invite.role,
        expiresAt: invite.expiresAt,
        createdAt: invite.createdAt,
        inviteUrl: `${base.replace(/\/$/, "")}/settings/team?invite=${invite.token}`,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invite failed";
    const status = msg === "Forbidden" ? 403 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
