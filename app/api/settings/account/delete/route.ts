import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { getProfile, softDeleteAccount, AccountDeletedError } from "@/lib/settings/repository";

export async function POST() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;

  const profile = await getProfile(auth.user.userId);
  if (profile?.deletedAt) {
    return NextResponse.json({ ok: true, already_deleted: true, logout: "/auth/logout" });
  }

  await softDeleteAccount(auth.user.userId);
  return NextResponse.json({ ok: true, logout: "/auth/logout" });
}
