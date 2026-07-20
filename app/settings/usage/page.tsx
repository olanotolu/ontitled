import { requireOnboarded } from "@/lib/onboarding/require";
import UsageClient from "./UsageClient";

export default async function UsageSettingsPage() {
  const { session } = await requireOnboarded();
  return <UsageClient session={session} />;
}
