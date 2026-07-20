import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfileSettingsPage() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/login");
  return <ProfileClient session={session} />;
}
