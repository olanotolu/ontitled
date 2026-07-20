import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { AuthScreen } from "../auth/AuthScreen";

export const metadata: Metadata = {
  title: "Sign up — [Ontitled]",
  description: "Create your Themis account",
};

export default async function SignupPage({
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

  return <AuthScreen mode="signup" error={error} />;
}
