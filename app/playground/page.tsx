import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/settings/repository";
import PlaygroundClient from "./PlaygroundClient";

export default async function PlaygroundPage() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/login");
  const profile = await getProfile(session.user.sub);
  if (profile?.deletedAt) redirect("/account-deleted");
  return <PlaygroundClient session={session} />;
}
