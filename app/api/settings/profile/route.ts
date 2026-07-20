import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace, now } from "@/lib/settings/ensure";
import { withStore } from "@/lib/settings/store";

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

  const profile = await withStore(
    (store) => {
      const p = store.profiles[auth.user.userId];
      if (!p || p.deletedAt) throw new Error("Profile not found");
      if (typeof body.displayName === "string") {
        p.displayName = body.displayName.trim().slice(0, 80) || p.displayName;
      }
      if (typeof body.jobTitle === "string") {
        p.jobTitle = body.jobTitle.trim().slice(0, 80);
      }
      p.updatedAt = now();
      store.profiles[auth.user.userId] = p;
      return p;
    },
    { mutate: true }
  );

  return NextResponse.json({ profile });
}
