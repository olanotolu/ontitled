import { requireOnboarded } from "@/lib/onboarding/require";
import TeamClient from "./TeamClient";

export default async function TeamSettingsPage() {
  const { session } = await requireOnboarded();
  return <TeamClient session={session} />;
}
