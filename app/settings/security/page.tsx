import { requireOnboarded } from "@/lib/onboarding/require";
import SecurityClient from "./SecurityClient";

export default async function SecuritySettingsPage() {
  const { session } = await requireOnboarded();
  return <SecurityClient session={session} />;
}
