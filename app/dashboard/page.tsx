import { requireOnboarded } from "@/lib/onboarding/require";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const { session } = await requireOnboarded();
  return <DashboardClient session={session} />;
}
