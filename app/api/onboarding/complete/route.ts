import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace, now, slugify } from "@/lib/settings/ensure";
import { withStore } from "@/lib/settings/store";
import { normalizeProfile } from "@/lib/settings/types";
import { randomBytes } from "node:crypto";

export async function POST() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  await ensureUserWorkspace(auth.user);

  try {
    await withStore(
      (store) => {
        let p = store.profiles[auth.user.userId];
        if (!p || p.deletedAt) throw new Error("Profile not found");
        p = normalizeProfile(p);

        if (!p.accountType) throw new Error("Choose an account type");
        if (!p.firstName?.trim() || !p.lastName?.trim()) {
          throw new Error("First and last name are required");
        }

        if (p.accountType === "business") {
          const legal = p.onboarding.business?.legalName?.trim();
          if (!legal) throw new Error("Legal business name is required");
        }

        p.onboardingCompleted = true;
        p.onboardingStep = "review";
        p.displayName = [p.firstName, p.lastName].filter(Boolean).join(" ");
        p.updatedAt = now();
        store.profiles[auth.user.userId] = p;

        // Align workspace with business name when applicable
        const wsId = store.userWorkspace[auth.user.userId];
        const ws = wsId ? store.workspaces[wsId] : null;
        if (ws && p.accountType === "business" && p.onboarding.business) {
          const b = p.onboarding.business;
          ws.name = (b.displayName || b.legalName || ws.name).trim() || ws.name;
          if (b.handle) {
            let s = slugify(b.handle);
            const taken = new Set(
              Object.values(store.workspaces)
                .filter((w) => w.id !== ws.id)
                .map((w) => w.slug)
            );
            if (taken.has(s)) s = `${s}-${randomBytes(2).toString("hex")}`;
            ws.slug = s;
          }
          ws.updatedAt = now();
          store.workspaces[ws.id] = ws;
        }
      },
      { mutate: true }
    );

    return NextResponse.json({ ok: true, redirectTo: "/dashboard" });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not complete onboarding";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
