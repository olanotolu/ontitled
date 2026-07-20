import { auth0 } from "@/lib/auth0";
import { NextResponse } from "next/server";

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
