import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import UsageClient from "./UsageClient";

export default async function UsageSettingsPage() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/login");
  return <UsageClient session={session} />;
}
