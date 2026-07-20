"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { saveOnboarding, useOnboardingState } from "@/components/onboarding/useOnboarding";

export default function BusinessClient() {
  const router = useRouter();
  const { data, loading } = useOnboardingState();
  const [legalName, setLegalName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [handle, setHandle] = useState("");
  const [website, setWebsite] = useState("");
  const [registeredDifferent, setRegisteredDifferent] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const b = data?.onboarding?.business;
    if (!b) return;
    setLegalName(b.legalName || "");
    setDisplayName(b.displayName || "");
    setHandle(b.handle || "");
    setWebsite(b.website || "");
    setRegisteredDifferent(b.registeredDifferentName);
  }, [data]);

  const canContinue = legalName.trim().length > 0;

  async function onContinue() {
    if (!canContinue) return;
    setBusy(true);
    setError(null);
    try {
      await saveOnboarding({
        onboardingStep: "ownership",
        onboarding: {
          business: {
            legalName: legalName.trim(),
            displayName: displayName.trim(),
            handle: handle.trim().replace(/^@/, ""),
            website: website.trim(),
            registeredDifferentName: registeredDifferent,
          },
        },
      });
      router.push("/onboarding/ownership");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setBusy(false);
    }
  }

  return (
    <OnboardingShell steps={data?.steps || []} currentId="business">
      <div className="ob-panel wide">
        <h1 className="ob-title">Business details</h1>
        <p className="ob-sub">Let&apos;s get to know your organization better.</p>
        {loading ? <p className="ob-muted">Loading…</p> : null}

        <div className="ob-logo-placeholder">
          <span>?</span>
          <small>Logo (optional)</small>
        </div>

        <div className="ob-form">
          <label className="ob-field">
            <span>Legal business name</span>
            <input
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              placeholder="Company, Inc."
            />
          </label>
          <label className="ob-field">
            <span>Business display name (optional)</span>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Company"
            />
            <small>This is how we&apos;ll refer to you in Ontitled.</small>
          </label>
          <label className="ob-field">
            <span>Handle</span>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value.replace(/^@/, ""))}
              placeholder="@handle"
            />
            <small>This is how people will find and interact with you.</small>
          </label>
          <label className="ob-field">
            <span>Website URL</span>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="www.company.com"
            />
          </label>

          <fieldset className="ob-fieldset">
            <legend>Is your business registered under a different name?</legend>
            <p className="ob-muted">
              In some cases, the name you&apos;ve chosen to register is not the name you&apos;re
              operating under.
            </p>
            <div className="ob-yesno">
              <button
                type="button"
                className={`ob-yesno-btn${registeredDifferent === true ? " selected" : ""}`}
                onClick={() => setRegisteredDifferent(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`ob-yesno-btn${registeredDifferent === false ? " selected" : ""}`}
                onClick={() => setRegisteredDifferent(false)}
              >
                No
              </button>
            </div>
          </fieldset>
        </div>

        {error ? <p className="ob-error">{error}</p> : null}

        <div className="ob-actions">
          <button type="button" className="ob-btn" onClick={() => router.push("/onboarding/personal")}>
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
