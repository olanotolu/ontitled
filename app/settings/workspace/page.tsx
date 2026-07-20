import { requireOnboarded } from "@/lib/onboarding/require";
import WorkspaceClient from "./WorkspaceClient";

export default async function WorkspaceSettingsPage() {
  const { session } = await requireOnboarded();
  return <WorkspaceClient session={session} />;
}
