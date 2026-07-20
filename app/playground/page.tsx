import { requireOnboarded } from "@/lib/onboarding/require";
import PlaygroundClient from "./PlaygroundClient";

export default async function PlaygroundPage() {
  const { session } = await requireOnboarded();
  return <PlaygroundClient session={session} />;
}
