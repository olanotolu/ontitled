import { requireOnboarded } from "@/lib/onboarding/require";
import ProfileClient from "./ProfileClient";

export default async function ProfileSettingsPage() {
  const { session } = await requireOnboarded();
  return <ProfileClient session={session} />;
}
