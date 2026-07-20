import { auth0 } from "@/lib/auth0";
import { AuthPageClient } from "./AuthPageClient";

export default async function AuthPage() {
  const session = await auth0.getSession();

  return <AuthPageClient session={session} />;
}
