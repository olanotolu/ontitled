"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { StepDef } from "@/lib/onboarding/steps";

function Wordmark() {
  return (
    <Link href="/" className="ob-wordmark" aria-label="Ontitled">
      <span className="ob-mark" aria-hidden="true" />
      <span className="ob-wordmark-text">Ontitled</span>
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
          <li
            key={step.id}
            className={`ob-step${done ? " done" : ""}${active ? " active" : ""}`}
          >
            <span className="ob-step-rail" aria-hidden="true">
              <span className="ob-step-dot">
                {done ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              {i < steps.length - 1 ? <span className="ob-step-line" /> : null}
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
  visualSrc = "/auth/signup-visual.png",
  children,
}: {
  steps?: StepDef[];
  currentId?: string;
  showVisual?: boolean;
  visualSrc?: string;
  children: ReactNode;
}) {
  const wizard = Boolean(steps && steps.length > 0 && currentId);

  return (
    <div
      className={`ob-page${showVisual ? " has-visual" : ""}${wizard ? " is-wizard" : ""}`}
    >
      <header className="ob-top">
        <Wordmark />
        {wizard ? (
          <a href="/auth/logout" className="ob-logout">
            Log out
          </a>
        ) : (
          <span className="ob-top-spacer" aria-hidden="true" />
        )}
      </header>

      {wizard ? (
        <div className="ob-wizard">
          <aside className="ob-aside">
            <Stepper steps={steps!} currentId={currentId!} />
            <p className="ob-help">
              Need help? <a href="mailto:hello@ontitled.com">Contact support</a>
            </p>
          </aside>
          <main className="ob-main">{children}</main>
        </div>
      ) : (
        <div className="ob-setup">
          <main className="ob-main">{children}</main>
        </div>
      )}

      {showVisual ? (
        <div className="ob-visual-wrap" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ob-visual" src={visualSrc} alt="" />
        </div>
      ) : null}
    </div>
  );
}
