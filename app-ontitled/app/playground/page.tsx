import { auth0 } from "@/lib/auth0";
import PlaygroundClient from "./PlaygroundClient";

export default async function PlaygroundPage() {
  const session = await auth0.getSession();

  return <PlaygroundClient session={session} />;
}
