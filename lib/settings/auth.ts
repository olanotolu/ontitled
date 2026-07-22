import { auth0 } from "@/lib/auth0";
import { NextResponse } from "next/server";
import { getProfile } from "./repository";

export type AuthUser = {
  userId: string;
  email: string;
  name: string;
};

export async function requireUser(): Promise<
  { user: AuthUser } | { error: NextResponse }
> {
  const session = await auth0.getSession();
  const u = session?.user;
  if (!u?.sub) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return {
    user: {
      userId: u.sub,
      email: (u.email as string) || "",
      name: (u.name as string) || (u.email as string) || "User",
    },
  };
}

export async function requireActiveUser(): Promise<
  { user: AuthUser } | { error: NextResponse }
> {
  const result = await requireUser();
  if ("error" in result) return result;

  const profile = await getProfile(result.user.userId);
  if (profile?.deletedAt) {
    return {
      error: NextResponse.json(
        { error: "account_deleted" },
        { status: 403 }
      ),
    };
  }

  return result;
}
