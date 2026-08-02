import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { AuthScreen } from "../auth/AuthScreen";

export const metadata: Metadata = {
  title: "Log in — [Ontitled]",
  description: "Sign in to Dyson",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string }>;
}) {
  const session = await auth0.getSession();
  if (session) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const error = params.error_description || params.error || undefined;

  return <AuthScreen mode="login" error={error} />;
}
