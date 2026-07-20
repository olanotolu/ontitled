"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { StepDef } from "@/lib/onboarding/steps";

function Wordmark() {
  return (
    <Link href="/" className="ob-wordmark" aria-label="Ontitled">
      <span className="ob-mark" aria-hidden="true" />
      <span>Ontitled</span>
    </Link>
  );
}

function Stepper({
  steps,
  currentId,
}: {
  steps: StepDef[];
  currentId: string;
}) {
  const idx = steps.findIndex((s) => s.id === currentId);
  return (
    <ol className="ob-stepper">
      {steps.map((step, i) => {
        const done = idx > i;
        const active = step.id === currentId;
        return (
          <li key={step.id} className={`ob-step${done ? " done" : ""}${active ? " active" : ""}`}>
            <span className="ob-step-dot" aria-hidden="true">
              {done ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span className="ob-step-text">
              <span className="ob-step-label">{step.label}</span>
              <span className="ob-step-desc">{step.description}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function OnboardingShell({
  steps,
  currentId,
  showVisual,
  children,
}: {
  steps?: StepDef[];
  currentId?: string;
  showVisual?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`ob-page${showVisual ? " has-visual" : ""}`}>
      <div className="ob-top">
        <Wordmark />
        <a href="/auth/logout" className="ob-logout">
          Log out
        </a>
      </div>

      <div className="ob-body">
        {steps && steps.length > 0 && currentId ? (
          <aside className="ob-aside">
            <Stepper steps={steps} currentId={currentId} />
            <p className="ob-help">
              Need help? <a href="mailto:hello@ontitled.com">Contact support</a>
            </p>
          </aside>
        ) : null}

        <main className="ob-main">{children}</main>

        {showVisual ? (
          <aside className="ob-visual" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/auth/login-visual.jpg" alt="" />
          </aside>
        ) : null}
      </div>
    </div>
  );
}
