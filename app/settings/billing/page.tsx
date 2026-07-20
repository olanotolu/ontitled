import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import BillingClient from "./BillingClient";

export default async function BillingSettingsPage() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/login");
  return <BillingClient session={session} />;
}
