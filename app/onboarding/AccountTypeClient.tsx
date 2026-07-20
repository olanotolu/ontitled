"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { saveOnboarding } from "@/components/onboarding/useOnboarding";
import type { AccountType } from "@/lib/settings/types";

export default function AccountTypeClient() {
  const router = useRouter();
  const [type, setType] = useState<AccountType | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function continueNext() {
    if (!type) return;
    setBusy(true);
    setError(null);
    try {
      await saveOnboarding({ accountType: type, onboardingStep: "personal" });
      router.push("/onboarding/personal");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not continue");
      setBusy(false);
    }
  }

  return (
    <OnboardingShell showVisual>
      <div className="ob-panel">
        <h1 className="ob-title">Set up your account</h1>
        <p className="ob-sub">What type of account would you like to create?</p>

        <div className="ob-choice-list" role="radiogroup" aria-label="Account type">
          <button
            type="button"
            className={`ob-choice${type === "individual" ? " selected" : ""}`}
            onClick={() => setType("individual")}
            role="radio"
            aria-checked={type === "individual"}
          >
            <span className="ob-radio" />
            <span>
              <strong>Individual</strong>
              <span className="ob-choice-desc">I&apos;m opening an account for myself</span>
            </span>
          </button>
          <button
            type="button"
            className={`ob-choice${type === "business" ? " selected" : ""}`}
            onClick={() => setType("business")}
            role="radio"
            aria-checked={type === "business"}
          >
            <span className="ob-radio" />
            <span>
              <strong>Business</strong>
              <span className="ob-choice-desc">I&apos;m opening an account for my company</span>
            </span>
          </button>
        </div>

        {error ? <p className="ob-error">{error}</p> : null}

        <button
          type="button"
          className="ob-btn primary"
          disabled={!type || busy}
          onClick={continueNext}
        >
          {busy ? "Continuing…" : "Continue"}
        </button>
      </div>
    </OnboardingShell>
  );
}
