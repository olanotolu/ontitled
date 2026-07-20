"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { saveOnboarding, useOnboardingState } from "@/components/onboarding/useOnboarding";

export default function IdentityClient() {
  const router = useRouter();
  const { data, loading } = useOnboardingState();
  const [role, setRole] = useState("");
  const [useCase, setUseCase] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = data?.onboarding?.identity;
    if (!id) return;
    setRole(id.role || "");
    setUseCase(id.useCase || "");
  }, [data]);

  async function onContinue() {
    setBusy(true);
    setError(null);
    try {
      await saveOnboarding({
        onboardingStep: "review",
        onboarding: { identity: { role: role.trim(), useCase: useCase.trim() } },
      });
      router.push("/onboarding/review");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setBusy(false);
    }
  }

  return (
    <OnboardingShell steps={data?.steps || []} currentId="identity">
      <div className="ob-panel wide">
        <h1 className="ob-title">Identity details</h1>
        <p className="ob-sub">Confirm how you&apos;ll use Ontitled.</p>
        {loading ? <p className="ob-muted">Loading…</p> : null}

        <div className="ob-form">
          <label className="ob-field">
            <span>Email</span>
            <input value={data?.email || ""} disabled />
            <small>Verified via your Google / Auth0 login.</small>
          </label>
          <label className="ob-field">
            <span>Your role</span>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Founder, ML engineer, Creative director…"
            />
          </label>
          <label className="ob-field">
            <span>Primary use case</span>
            <input
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              placeholder="Eval models, fine-tune taste, research…"
            />
          </label>
        </div>

        {error ? <p className="ob-error">{error}</p> : null}

        <div className="ob-actions">
          <button type="button" className="ob-btn" onClick={() => router.push("/onboarding/personal")}>
            Go back
          </button>
          <button type="button" className="ob-btn primary" disabled={busy} onClick={onContinue}>
            {busy ? "Saving…" : "Continue"}
          </button>
        </div>
      </div>
    </OnboardingShell>
  );
}
