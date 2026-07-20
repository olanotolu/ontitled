import { requireOnboarded } from "@/lib/onboarding/require";
import BillingClient from "./BillingClient";

export default async function BillingSettingsPage() {
  const { session } = await requireOnboarded();
  return <BillingClient session={session} />;
}
