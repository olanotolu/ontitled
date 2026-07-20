import { requireOnboardingSession } from "@/lib/onboarding/require";
import { pathForStep } from "@/lib/onboarding/steps";
import { redirect } from "next/navigation";
import AccountTypeClient from "./AccountTypeClient";

export default async function OnboardingIndexPage() {
  const { profile } = await requireOnboardingSession();
  // Resume mid-flow if they already picked a type
  if (profile.accountType && profile.onboardingStep !== "account-type") {
    redirect(pathForStep(profile.accountType, profile.onboardingStep as never));
  }
  return <AccountTypeClient />;
}
