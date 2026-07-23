import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { updateProfile } from "@/lib/settings/repository";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const data = await ensureUserWorkspace(auth.user);
  return NextResponse.json({
    profile: data.profile,
    auth: { email: auth.user.email, name: auth.user.name, userId: auth.user.userId },
  });
}

export async function PATCH(req: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  await ensureUserWorkspace(auth.user);

  const body = (await req.json().catch(() => ({}))) as {
    displayName?: string;
    jobTitle?: string;
  };

  try {
    const profile = await updateProfile(auth.user.userId, {
      displayName: body.displayName,
      jobTitle: body.jobTitle,
    });
    return NextResponse.json({ profile });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Update failed";
    const status = msg === "Profile not found" ? 404 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
