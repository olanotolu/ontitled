"use client";

import type { Session } from "@auth0/nextjs-auth0";
import { AppShell } from "../../components/AppShell";
import Link from "next/link";

const sdkCols = [
  ["Get Started", "Models & Pricing", "Model Deprecations", "LoRA Primer"],
  ["Loss Functions", "Clock Cycles & Pipelining", "Session Metrics", "OpenAI-Compatible API"],
  ["CLI Reference", "API Reference"],
];

const cookbookCols = [
  ["Get Started", "Supervised Learning", "Reinforcement Learning"],
  ["Evaluation", "Storage", "Preferences"],
  ["Recipes", "API Reference", "Contributing"],
];

function IconExternal() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconSdk() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 9 4 12l4 3M16 9l4 3-4 3M13 5l-2 14" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5z" />
      <path d="M18 3v18M8 7h6M8 11h6" />
    </svg>
  );
}

function IconSessions() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h6M7 12h10M7 16h4" />
    </svg>
  );
}

function IconKey() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="15" r="4" />
      <path d="M11.5 12.5 20 4l2 2-2 2-1.5-1.5L16 9l1.5 1.5" />
    </svg>
  );
}

function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 440 300" fill="none" className="hero-art-svg">
        <path
          d="M42 92c-8 48 14 98 62 118 46 20 108 8 148-22 22-16 48-12 62 8 18 26 52 34 84 18 28-14 42-48 34-78-10-38-42-64-82-70-48-8-78 8-118 4-42-4-78-18-112-8-36 10-68 24-78 30z"
          fill="#111111"
        />
        <ellipse cx="210" cy="78" rx="92" ry="58" fill="#111111" />
        <path
          d="M292 28c36-18 92-8 118 28 24 34 20 86-12 116-28 26-74 28-106 6-34-24-44-70-28-108 6-14 16-30 28-42z"
          fill="#2563EB"
        />
        <ellipse cx="348" cy="88" rx="48" ry="42" fill="#3B82F6" opacity="0.55" />
        <circle cx="248" cy="228" r="38" fill="#4ADE80" />
        <circle cx="388" cy="198" r="44" fill="#EF4444" />
      </svg>
    </div>
  );
}

type Props = {
  session: Session | null | undefined;
};

export default function DashboardClient({ session }: Props) {
  return (
    <AppShell session={session}>
      <div className="dash-content">
        <section className="hero">
          <div className="hero-text">
            <p className="hero-kicker">
              Introducing <strong>Themis</strong>
            </p>
            <h1 className="hero-headline">
              Open weights,
              <br />
              ready to tinker.
            </h1>
            <p className="hero-desc">
              An efficient open reasoning model for text, images, and audio, available to fine-tune.
            </p>
            <div className="hero-actions">
              <Link href="/playground" className="btn btn-soft">
                Try in Playground
              </Link>
              <button type="button" className="btn btn-text">
                Learn more <IconChevron />
              </button>
            </div>
          </div>
          <HeroArt />
        </section>

        <div className="bento">
          <section className="bento-cell bento-links">
            <header className="bento-head">
              <span className="bento-icon">
                <IconSdk />
              </span>
              <h2 className="bento-title">Tinker SDK</h2>
              <span className="bento-ext">
                <IconExternal />
              </span>
            </header>
            <div className="link-cols">
              {sdkCols.map((col, i) => (
                <ul key={i} className="link-col">
                  {col.map((label) => (
                    <li key={label}>
                      <button type="button" className="text-link">
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </section>

          <section className="bento-cell bento-links">
            <header className="bento-head">
              <span className="bento-icon">
                <IconBook />
              </span>
              <h2 className="bento-title">Cookbook</h2>
              <span className="bento-ext">
                <IconExternal />
              </span>
            </header>
            <div className="link-cols">
              {cookbookCols.map((col, i) => (
                <ul key={i} className="link-col">
                  {col.map((label) => (
                    <li key={label}>
                      <button type="button" className="text-link">
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </section>

          <section className="bento-cell bento-empty">
            <header className="bento-head">
              <span className="bento-icon">
                <IconSessions />
              </span>
              <h2 className="bento-title">Sessions</h2>
            </header>
            <div className="empty-body">
              <p className="empty-desc">Your training sessions will appear here.</p>
              <button type="button" className="btn btn-outline">
                Get started with Tinker SDK <IconExternal />
              </button>
            </div>
          </section>

          <section className="bento-cell bento-empty">
            <header className="bento-head">
              <span className="bento-icon">
                <IconKey />
              </span>
              <h2 className="bento-title">API keys</h2>
            </header>
            <div className="empty-body">
              <p className="empty-desc">Your API keys will appear here.</p>
              <button type="button" className="btn btn-outline">
                Add a key
              </button>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
