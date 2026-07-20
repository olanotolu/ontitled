"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { saveOnboarding, useOnboardingState } from "@/components/onboarding/useOnboarding";

type OwnerRow = { name: string; percent: number };

export default function OwnershipClient() {
  const router = useRouter();
  const { data, loading } = useOnboardingState();
  const [owners, setOwners] = useState<OwnerRow[]>([{ name: "", percent: 0 }]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data?.onboarding?.ownership?.length) {
      setOwners(data.onboarding.ownership);
    }
  }, [data]);

  function updateRow(i: number, patch: Partial<OwnerRow>) {
    setOwners((rows) => rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  async function onContinue() {
    setBusy(true);
    setError(null);
    try {
      const cleaned = owners
        .map((o) => ({ name: o.name.trim(), percent: Number(o.percent) || 0 }))
        .filter((o) => o.name);
      await saveOnboarding({
        onboardingStep: "review",
        onboarding: { ownership: cleaned },
      });
      router.push("/onboarding/review");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
      setBusy(false);
    }
  }

  return (
    <OnboardingShell steps={data?.steps || []} currentId="ownership">
      <div className="ob-panel wide">
        <h1 className="ob-title">Ownership details</h1>
        <p className="ob-sub">List stakeholders with 25% or more ownership (optional for pre-alpha).</p>
        {loading ? <p className="ob-muted">Loading…</p> : null}

        <div className="ob-form">
          {owners.map((row, i) => (
            <div className="ob-row-2" key={i}>
              <label className="ob-field">
                <span>Full name</span>
                <input
                  value={row.name}
                  onChange={(e) => updateRow(i, { name: e.target.value })}
                  placeholder="Owner name"
                />
              </label>
              <label className="ob-field">
                <span>Ownership %</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={row.percent || ""}
                  onChange={(e) => updateRow(i, { percent: Number(e.target.value) })}
                  placeholder="25"
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            className="ob-btn"
            onClick={() => setOwners((r) => [...r, { name: "", percent: 0 }])}
          >
            Add stakeholder
          </button>
        </div>

        {error ? <p className="ob-error">{error}</p> : null}

        <div className="ob-actions">
          <button type="button" className="ob-btn" onClick={() => router.push("/onboarding/business")}>
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
