import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import TeamClient from "./TeamClient";

export default async function TeamSettingsPage() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/login");
  return <TeamClient session={session} />;
}
