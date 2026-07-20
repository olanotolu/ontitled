import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import WorkspaceClient from "./WorkspaceClient";

export default async function WorkspaceSettingsPage() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/login");
  return <WorkspaceClient session={session} />;
}
