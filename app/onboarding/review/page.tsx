import { requireOnboardingSession } from "@/lib/onboarding/require";
import { redirect } from "next/navigation";
import ReviewClient from "./ReviewClient";

export default async function ReviewOnboardingPage() {
  const { profile } = await requireOnboardingSession();
  if (!profile.accountType) redirect("/onboarding");
  return <ReviewClient />;
}
