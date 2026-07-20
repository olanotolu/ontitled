import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { AuthScreen } from "../auth/AuthScreen";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { pathForStep } from "@/lib/onboarding/steps";

export const metadata: Metadata = {
  title: "Sign up — [Ontitled]",
  description: "Create your Themis account",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string }>;
}) {
  const session = await auth0.getSession();
  if (session?.user?.sub) {
    const { profile } = await ensureUserWorkspace({
      userId: session.user.sub,
      email: (session.user.email as string) || "",
      name: (session.user.name as string) || (session.user.email as string) || "User",
    });
    if (profile.onboardingCompleted) redirect("/dashboard");
    redirect(pathForStep(profile.accountType, profile.onboardingStep as never));
  }

  const params = await searchParams;
  const error = params.error_description || params.error || undefined;

  return <AuthScreen mode="signup" error={error} />;
}
