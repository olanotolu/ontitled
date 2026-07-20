import { requireOnboardingSession } from "@/lib/onboarding/require";
import { redirect } from "next/navigation";
import BusinessClient from "./BusinessClient";

export default async function BusinessOnboardingPage() {
  const { profile } = await requireOnboardingSession();
  if (profile.accountType !== "business") redirect("/onboarding");
  return <BusinessClient />;
}
