"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { saveOnboarding, useOnboardingState } from "@/components/onboarding/useOnboarding";
import type { AccountType } from "@/lib/settings/types";

export default function PersonalClient({ accountType }: { accountType: AccountType }) {
  const router = useRouter();
  const { data, loading } = useOnboardingState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [handle, setHandle] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    setFirstName(data.firstName || "");
    setLastName(data.lastName || "");
    setPhone(data.phone || "");
    setHandle(data.handle || "");
  }, [data]);

  const canContinue = firstName.trim().length > 0 && lastName.trim().length > 0;
  const nextStep = accountType === "business" ? "business" : "identity";
  const nextPath =
    accountType === "business" ? "/onboarding/business" : "/onboarding/identity";

  async function onContinue() {
    if (!canContinue) return;
    setBusy(true);
    setError(null);
    try {
      await saveOnboarding({
        firstName,
        lastName,
        phone,
        handle,
        onboardingStep: nextStep,
      });
      router.push(nextPath);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setBusy(false);
    }
  }

  return (
    <OnboardingShell steps={data?.steps || []} currentId="personal">
      <div className="ob-panel wide">
        <h1 className="ob-title">Personal details</h1>
        <p className="ob-sub">Tell us a bit about yourself</p>

        {loading ? <p className="ob-muted">Loading…</p> : null}

        <div className="ob-form">
          <div className="ob-row-2">
            <label className="ob-field">
              <span>Legal first name</span>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First" />
            </label>
            <label className="ob-field">
              <span>Legal last name</span>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last" />
            </label>
          </div>

          {accountType === "individual" ? (
            <label className="ob-field">
              <span>Handle</span>
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value.replace(/^@/, ""))}
                placeholder="@handle"
              />
              <small>This is how people will find and interact with you.</small>
            </label>
          ) : null}

          <label className="ob-field">
            <span>Phone number</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 000 000-0000"
            />
          </label>
        </div>

        {error ? <p className="ob-error">{error}</p> : null}

        <div className="ob-actions">
          <button type="button" className="ob-btn" onClick={() => router.push("/onboarding")}>
            Go back
          </button>
          <button
            type="button"
            className="ob-btn primary"
            disabled={!canContinue || busy}
            onClick={onContinue}
          >
            {busy ? "Saving…" : "Continue"}
          </button>
        </div>
      </div>
    </OnboardingShell>
  );
}
