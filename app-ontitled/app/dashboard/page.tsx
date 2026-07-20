import { auth0 } from "@/lib/auth0";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth0.getSession();

  return <DashboardClient session={session} />;
}
