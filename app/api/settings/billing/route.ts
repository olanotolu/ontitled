import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const data = await ensureUserWorkspace(auth.user);
  return NextResponse.json({
    plan: data.workspace.plan,
    status: data.workspace.planStatus,
    paymentMethod: null,
    billingEmail: data.profile.email,
    portalAvailable: Boolean(process.env.STRIPE_SECRET_KEY),
    message: process.env.STRIPE_SECRET_KEY
      ? "Stripe billing portal available."
      : "Billing is in pre-alpha. No payment method required yet.",
  });
}
