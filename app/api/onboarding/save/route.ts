import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace, now } from "@/lib/settings/ensure";
import { withStore } from "@/lib/settings/store";
import type { AccountType, OnboardingData, Profile } from "@/lib/settings/types";
import { normalizeProfile } from "@/lib/settings/types";

export async function PATCH(req: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  await ensureUserWorkspace(auth.user);

  const body = (await req.json().catch(() => ({}))) as {
    accountType?: AccountType | null;
    onboardingStep?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    handle?: string;
    onboarding?: OnboardingData;
  };

  try {
    const profile = await withStore(
      (store) => {
        let p = store.profiles[auth.user.userId];
        if (!p || p.deletedAt) throw new Error("Profile not found");
        p = normalizeProfile(p);

        if (body.accountType === "individual" || body.accountType === "business") {
          p.accountType = body.accountType;
          if (p.onboardingStep === "account-type") p.onboardingStep = "personal";
        }
        if (typeof body.onboardingStep === "string" && body.onboardingStep) {
          p.onboardingStep = body.onboardingStep;
        }
        if (typeof body.firstName === "string") p.firstName = body.firstName.trim().slice(0, 80);
        if (typeof body.lastName === "string") p.lastName = body.lastName.trim().slice(0, 80);
        if (typeof body.phone === "string") p.phone = body.phone.trim().slice(0, 40);
        if (typeof body.handle === "string") {
          const handle = body.handle.trim().replace(/^@/, "").toLowerCase().slice(0, 40);
          if (handle) {
            const clash = Object.values(store.profiles).some(
              (x) => x.userId !== auth.user.userId && (x.handle || "").toLowerCase() === handle
            );
            if (clash) throw new Error("Handle already taken");
          }
          p.handle = handle;
        }
        if (body.onboarding && typeof body.onboarding === "object") {
          p.onboarding = {
            ...p.onboarding,
            ...body.onboarding,
            business: body.onboarding.business
              ? { ...(p.onboarding.business || {}), ...body.onboarding.business }
              : p.onboarding.business,
            ownership: body.onboarding.ownership ?? p.onboarding.ownership,
            identity: body.onboarding.identity
              ? { ...(p.onboarding.identity || { role: "", useCase: "" }), ...body.onboarding.identity }
              : p.onboarding.identity,
          };
        }

        if (p.firstName || p.lastName) {
          p.displayName = [p.firstName, p.lastName].filter(Boolean).join(" ") || p.displayName;
        }
        p.updatedAt = now();
        store.profiles[auth.user.userId] = p as Profile;
        return p;
      },
      { mutate: true }
    );

    return NextResponse.json({ profile });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed";
    const status = msg.includes("taken") ? 409 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
