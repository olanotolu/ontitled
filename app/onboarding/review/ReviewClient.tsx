"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { completeOnboarding, useOnboardingState } from "@/components/onboarding/useOnboarding";

export default function ReviewClient() {
  const router = useRouter();
  const { data, loading } = useOnboardingState();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backPath =
    data?.accountType === "business" ? "/onboarding/ownership" : "/onboarding/identity";

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const res = await completeOnboarding();
      window.location.href = res.redirectTo || "/dashboard";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not complete");
      setBusy(false);
    }
  }

  return (
    <OnboardingShell steps={data?.steps || []} currentId="review">
      <div className="ob-panel wide">
        <h1 className="ob-title">Review</h1>
        <p className="ob-sub">Confirm your details and submit to open your workspace.</p>
        {loading ? <p className="ob-muted">Loading…</p> : null}

        {data ? (
          <div className="ob-review">
            <div className="ob-review-block">
              <h3>Account</h3>
              <p>
                Type: <strong>{data.accountType}</strong>
              </p>
              <p>
                Name:{" "}
                <strong>
                  {data.firstName} {data.lastName}
                </strong>
              </p>
              <p>
                Email: <strong>{data.email}</strong>
              </p>
              {data.handle ? (
                <p>
                  Handle: <strong>@{data.handle}</strong>
                </p>
              ) : null}
              {data.phone ? (
                <p>
                  Phone: <strong>{data.phone}</strong>
                </p>
              ) : null}
            </div>

            {data.accountType === "business" && data.onboarding.business ? (
              <div className="ob-review-block">
                <h3>Business</h3>
                <p>
                  Legal name: <strong>{data.onboarding.business.legalName}</strong>
                </p>
                {data.onboarding.business.displayName ? (
                  <p>
                    Display: <strong>{data.onboarding.business.displayName}</strong>
                  </p>
                ) : null}
                {data.onboarding.business.handle ? (
                  <p>
                    Handle: <strong>@{data.onboarding.business.handle}</strong>
                  </p>
                ) : null}
                {data.onboarding.business.website ? (
                  <p>
                    Website: <strong>{data.onboarding.business.website}</strong>
                  </p>
                ) : null}
              </div>
            ) : null}

            {data.accountType === "individual" && data.onboarding.identity ? (
              <div className="ob-review-block">
                <h3>Identity</h3>
                {data.onboarding.identity.role ? (
                  <p>
                    Role: <strong>{data.onboarding.identity.role}</strong>
                  </p>
                ) : null}
                {data.onboarding.identity.useCase ? (
                  <p>
                    Use case: <strong>{data.onboarding.identity.useCase}</strong>
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {error ? <p className="ob-error">{error}</p> : null}

        <div className="ob-actions">
          <button type="button" className="ob-btn" onClick={() => router.push(backPath)}>
            Go back
          </button>
          <button type="button" className="ob-btn primary" disabled={busy} onClick={submit}>
            {busy ? "Submitting…" : "Confirm and submit"}
          </button>
        </div>
      </div>
    </OnboardingShell>
  );
}
