import { requireOnboardingSession } from "@/lib/onboarding/require";
import { redirect } from "next/navigation";
import IdentityClient from "./IdentityClient";

export default async function IdentityOnboardingPage() {
  const { profile } = await requireOnboardingSession();
  if (profile.accountType !== "individual") redirect("/onboarding");
  return <IdentityClient />;
}
