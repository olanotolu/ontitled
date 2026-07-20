import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import PlaygroundClient from "./PlaygroundClient";

export default async function PlaygroundPage() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/login");
  return <PlaygroundClient session={session} />;
}
