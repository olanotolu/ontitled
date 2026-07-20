import { requireOnboardingSession } from "@/lib/onboarding/require";
import { redirect } from "next/navigation";
import PersonalClient from "./PersonalClient";

export default async function PersonalOnboardingPage() {
  const { profile } = await requireOnboardingSession();
  if (!profile.accountType) redirect("/onboarding");
  return <PersonalClient accountType={profile.accountType} />;
}
