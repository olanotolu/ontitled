import { requireOnboarded } from "@/lib/onboarding/require";
import ApiKeysClient from "./ApiKeysClient";

export default async function ApiKeysSettingsPage() {
  const { session } = await requireOnboarded();
  return <ApiKeysClient session={session} />;
}
