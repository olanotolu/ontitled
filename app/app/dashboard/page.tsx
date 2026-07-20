"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("themis_dev_auth");
      if (raw) {
        const data = JSON.parse(raw);
        if (data && data.user) {
          setAuthed(true);
          return;
        }
      }
    } catch {}
    router.replace("/app");
  }, [router]);

  if (!authed) return null;

  function signOut() {
    try { localStorage.removeItem("themis_dev_auth"); } catch {}
    router.push("/app");
  }

  return (
    <div className="dash-page">
      <header className="dash-header">
        <div className="dash-brand">
          <span className="wordmark">
            <span className="brackets">[</span>
            Ontitled
            <span className="brackets">]</span>
          </span>
          <span className="dash-kicker">Themis</span>
        </div>
        <button className="dash-signout" onClick={signOut}>
          Sign out
        </button>
      </header>

      <main className="dash-main">
        <h1 className="dash-title">Welcome, panda 🐼</h1>
        <p className="dash-sub">
          You&apos;re signed in to the Themis dev environment. This is where evaluations will live.
        </p>

        <div className="dash-grid">
          <div className="dash-card">
            <h3>Evaluations</h3>
            <p>No evaluations yet. Create your first one to get started.</p>
            <button className="dash-btn" disabled>New evaluation</button>
          </div>
          <div className="dash-card">
            <h3>Experts</h3>
            <p>Your roster of verified creative experts will appear here.</p>
            <button className="dash-btn" disabled>Browse experts</button>
          </div>
          <div className="dash-card">
            <h3>Reports</h3>
            <p>Actuarial reports and scoring breakdowns will be available here.</p>
            <button className="dash-btn" disabled>View reports</button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .dash-page {
          min-height: 100dvh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
        }

        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px clamp(20px, 4vw, 48px);
          border-bottom: 1px solid var(--line);
        }

        .dash-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dash-kicker {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--sage-deep);
        }

        .dash-signout {
          border: 1px solid var(--line);
          border-radius: 999px;
          background: transparent;
          color: var(--ink);
          padding: 8px 18px;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.18s ease, border-color 0.18s ease;
        }
        .dash-signout:hover {
          background: rgba(43, 43, 41, 0.04);
          border-color: rgba(43, 43, 41, 0.2);
        }

        .dash-main {
          flex: 1;
          padding: clamp(32px, 6vw, 64px) clamp(20px, 4vw, 48px);
          max-width: 960px;
          margin: 0 auto;
          width: 100%;
        }

        .dash-title {
          font-family: var(--serif);
          font-weight: 500;
          font-size: clamp(32px, 5vw, 44px);
          letter-spacing: -0.035em;
          margin-bottom: 10px;
        }

        .dash-sub {
          font-size: 15px;
          color: var(--muted);
          margin-bottom: 40px;
        }

        .dash-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        .dash-card {
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 24px;
          background: #fffcf7;
        }
        .dash-card h3 {
          font-family: var(--serif);
          font-weight: 500;
          font-size: 20px;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .dash-card p {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .dash-btn {
          border: 1px solid var(--line);
          border-radius: 999px;
          background: transparent;
          color: var(--faint);
          padding: 8px 18px;
          font-size: 13px;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .dash-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
