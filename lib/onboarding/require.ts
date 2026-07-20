import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import type { AuthUser } from "@/lib/settings/auth";
import { pathForStep } from "./steps";

export async function requireSessionUser() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) redirect("/login");
  const user: AuthUser = {
    userId: session.user.sub,
    email: (session.user.email as string) || "",
    name: (session.user.name as string) || (session.user.email as string) || "User",
  };
  return { session, user };
}

/** App surfaces that require completed onboarding */
export async function requireOnboarded() {
  const { session, user } = await requireSessionUser();
  const { profile } = await ensureUserWorkspace(user);
  if (!profile.onboardingCompleted) {
    const step = profile.onboardingStep || "account-type";
    redirect(pathForStep(profile.accountType, step as "account-type"));
  }
  return { session, user, profile };
}

/** Onboarding surfaces: must be logged in; completed users go to dashboard */
export async function requireOnboardingSession() {
  const { session, user } = await requireSessionUser();
  const data = await ensureUserWorkspace(user);
  if (data.profile.onboardingCompleted) {
    redirect("/dashboard");
  }
  return { session, user, ...data };
}
