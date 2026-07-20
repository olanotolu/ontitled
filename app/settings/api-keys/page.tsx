import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import ApiKeysClient from "./ApiKeysClient";

export default async function ApiKeysSettingsPage() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/login");
  return <ApiKeysClient session={session} />;
}
