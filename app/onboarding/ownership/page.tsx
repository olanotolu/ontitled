import { requireOnboardingSession } from "@/lib/onboarding/require";
import { redirect } from "next/navigation";
import OwnershipClient from "./OwnershipClient";

export default async function OwnershipOnboardingPage() {
  const { profile } = await requireOnboardingSession();
  if (profile.accountType !== "business") redirect("/onboarding");
  return <OwnershipClient />;
}
