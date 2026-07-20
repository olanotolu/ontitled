import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { stepsFor } from "@/lib/onboarding/steps";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const data = await ensureUserWorkspace(auth.user);
  const p = data.profile;
  return NextResponse.json({
    accountType: p.accountType,
    onboardingCompleted: p.onboardingCompleted,
    onboardingStep: p.onboardingStep,
    firstName: p.firstName,
    lastName: p.lastName,
    phone: p.phone,
    handle: p.handle,
    email: p.email,
    displayName: p.displayName,
    onboarding: p.onboarding || {},
    steps: stepsFor(p.accountType),
    workspace: {
      id: data.workspace.id,
      name: data.workspace.name,
      slug: data.workspace.slug,
    },
  });
}
