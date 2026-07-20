import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import SecurityClient from "./SecurityClient";

export default async function SecuritySettingsPage() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/login");
  return <SecurityClient session={session} />;
}
