"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const user = {
  name: "Olaoluwasubomi Aduloju",
  email: "i@olaoluwasubomi.com",
  initials: "OA",
};

const navItems = [
  { label: "Home", active: true },
  { label: "Projects" },
  { label: "Sessions" },
  { label: "Playground", badge: "New" },
  { label: "Docs", hasArrow: true },
];

const manageItems = ["API Keys"];
const adminItems = ["Users", "Teams"];
const bottomItems = ["Usage", "Billing"];

const sdkLinks = [
  "Get Started",
  "Models & Pricing",
  "Model Deprecations",
  "LoRA Primer",
  "Loss Functions",
  "Clock Cycles & Pipelining",
  "Session Metrics",
  "OpenAI-Compatible API",
  "CLI Reference",
  "API Reference",
];

const cookbookLinks = [
  "Get Started",
  "Supervised Learning",
  "Reinforcement Learning",
  "Evaluation",
  "Storage",
  "Preferences",
  "Recipes",
  "API Reference",
  "Contributing",
];

function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 420 300" aria-hidden="true">
      <defs>
        <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
      </defs>
      <path
        d="M60,160 Q20,100 100,70 T300,80 T380,180 T240,270 T80,230 Z"
        fill="#f4f4f5"
      />
      <circle cx="130" cy="130" r="22" fill="#4f8cff" opacity="0.9" />
      <circle cx="250" cy="110" r="16" fill="#7ee787" opacity="0.9" />
      <circle cx="310" cy="170" r="26" fill="#ff6b6b" opacity="0.9" />
      <path d="M152,140 L234,118" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M266,118 L284,150" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    router.replace("/");
  }, [router]);

  function signOut() {
    try { localStorage.removeItem("themis_dev_auth"); } catch {}
    router.push("/");
  }

  if (!authed) return null;

  const sidebar = (
    <aside className={`dash-sidebar ${menuOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <span className="tinker-logo">Tinker</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item ${item.active ? "active" : ""}`}
            onClick={() => { /* placeholder */ }}
          >
            <span className="nav-text">{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
            {item.hasArrow && <ChevronRight className="nav-arrow" />}
          </button>
        ))}

        <div className="nav-divider" />

        <div className="nav-label">Manage</div>
        {manageItems.map((label) => (
          <button key={label} className="nav-item" onClick={() => {}}>
            <span className="nav-text">{label}</span>
          </button>
        ))}

        <div className="nav-label">Admin</div>
        {adminItems.map((label) => (
          <button key={label} className="nav-item" onClick={() => {}}>
            <span className="nav-text">{label}</span>
          </button>
        ))}

        {bottomItems.map((label) => (
          <button key={label} className="nav-item" onClick={() => {}}>
            <span className="nav-text">{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-profile">
        <div className="profile-avatar">{user.initials}</div>
        <div className="profile-text">
          <div className="profile-name">{user.name}</div>
          <div className="profile-email">{user.email}</div>
        </div>
        <button className="profile-signout" onClick={signOut} aria-label="Sign out">
          <ChevronRight />
        </button>
      </div>
    </aside>
  );

  return (
    <div className="dash-root">
      <button
        className="mobile-toggle"
        onClick={() => setMenuOpen((s) => !s)}
        aria-label="Toggle navigation"
      >
        <MenuIcon />
      </button>

      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {sidebar}

      <main className="dash-main">
        <div className="dash-content">
          <section className="hero">
            <div className="hero-text">
              <span className="hero-kicker">Introducing Inkling</span>
              <h1 className="hero-headline">Open weights, ready to tinker.</h1>
              <p className="hero-desc">
                An efficient open reasoning model for text, images, and audio, available to fine-tune.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => {}}>
                  Try in Playground
                </button>
                <button className="btn btn-ghost" onClick={() => {}}>
                  Learn more <ChevronRight className="btn-icon" />
                </button>
              </div>
            </div>
            <HeroArt />
          </section>

          <section className="section">
            <div className="section-title">
              Tinker SDK
              <ExternalIcon className="section-icon" />
            </div>
            <div className="link-grid">
              {sdkLinks.map((label) => (
                <button key={label} className="link-card" onClick={() => {}}>
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-title">
              Cookbook
              <ExternalIcon className="section-icon" />
            </div>
            <div className="link-grid">
              {cookbookLinks.map((label) => (
                <button key={label} className="link-card" onClick={() => {}}>
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section className="empties">
            <div className="empty-card">
              <h3 className="empty-title">Sessions</h3>
              <p className="empty-desc">Your training sessions will appear here.</p>
              <button className="btn btn-primary" onClick={() => {}}>
                Get started with Tinker SDK
              </button>
            </div>
            <div className="empty-card">
              <h3 className="empty-title">API keys</h3>
              <p className="empty-desc">Your API keys will appear here.</p>
              <button className="btn btn-primary" onClick={() => {}}>
                Add a key
              </button>
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        .dash-root {
          --dash-ink: #111111;
          --dash-muted: #6b6b6b;
          --dash-faint: #a1a1a1;
          --dash-line: #e5e5e5;
          --dash-surface: #fafafa;
          --dash-blue: #4f8cff;
          --dash-bg: #ffffff;

          display: flex;
          min-height: 100dvh;
          background: var(--dash-bg);
          color: var(--dash-ink);
          font-family: var(--sans);
        }

        .dash-sidebar {
          width: 280px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--dash-line);
          background: var(--dash-bg);
        }

        .sidebar-header {
          padding: 24px 20px 12px;
        }

        .tinker-logo {
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 8px 12px;
        }

        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 8px 12px;
          margin-bottom: 2px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--dash-muted);
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .nav-item:hover {
          background: var(--dash-surface);
          color: var(--dash-ink);
        }

        .nav-item.active {
          background: #f4f4f5;
          color: var(--dash-ink);
          font-weight: 500;
        }

        .nav-badge {
          flex-shrink: 0;
          font-size: 10px;
          font-weight: 500;
          padding: 2px 6px;
          border-radius: 999px;
          background: #e0f2fe;
          color: #0369a1;
        }

        .nav-arrow {
          flex-shrink: 0;
          color: var(--dash-faint);
        }

        .nav-text {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .nav-divider {
          height: 1px;
          background: var(--dash-line);
          margin: 12px 8px;
        }

        .nav-label {
          padding: 10px 12px 4px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--dash-faint);
        }

        .sidebar-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 16px 20px;
          border-top: 1px solid var(--dash-line);
        }

        .profile-avatar {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: var(--dash-ink);
          color: #fff;
          font-size: 12px;
          font-weight: 500;
        }

        .profile-text {
          flex: 1;
          min-width: 0;
        }

        .profile-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--dash-ink);
          line-height: 1.35;
          overflow-wrap: anywhere;
        }

        .profile-email {
          font-size: 12px;
          color: var(--dash-muted);
          line-height: 1.35;
          overflow-wrap: anywhere;
        }

        .profile-signout {
          border: 0;
          background: transparent;
          color: var(--dash-faint);
          cursor: pointer;
          padding: 4px;
          display: grid;
          place-items: center;
        }

        .profile-signout:hover {
          color: var(--dash-ink);
        }

        .dash-main {
          flex: 1;
          min-width: 0;
          padding: 48px;
          overflow: auto;
        }

        .dash-content {
          max-width: 1100px;
          margin: 0 auto;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 32px;
          margin-bottom: 64px;
        }

        .hero-kicker {
          display: block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--dash-muted);
          margin-bottom: 12px;
        }

        .hero-headline {
          font-family: var(--serif);
          font-size: clamp(36px, 4.5vw, 56px);
          font-weight: 500;
          letter-spacing: -0.035em;
          line-height: 1.05;
          margin-bottom: 16px;
        }

        .hero-desc {
          font-size: 16px;
          line-height: 1.55;
          color: var(--dash-muted);
          max-width: 46ch;
          margin-bottom: 28px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: opacity 0.15s ease, background 0.15s ease;
        }

        .btn-primary {
          border: 0;
          background: var(--dash-ink);
          color: #fff;
        }

        .btn-primary:hover {
          opacity: 0.85;
        }

        .btn-ghost {
          border: 1px solid var(--dash-line);
          background: transparent;
          color: var(--dash-ink);
        }

        .btn-ghost:hover {
          background: var(--dash-surface);
        }

        .btn-icon {
          margin-left: 2px;
        }

        .hero-art {
          width: 100%;
          max-width: 380px;
          justify-self: end;
        }

        .section {
          margin-bottom: 48px;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.015em;
          margin-bottom: 16px;
        }

        .section-icon {
          color: var(--dash-faint);
        }

        .link-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .link-card {
          text-align: left;
          padding: 14px 16px;
          border: 1px solid var(--dash-line);
          border-radius: 12px;
          background: var(--dash-bg);
          color: var(--dash-ink);
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .link-card:hover {
          background: var(--dash-surface);
          border-color: #d4d4d8;
        }

        .empties {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .empty-card {
          border: 1px solid var(--dash-line);
          border-radius: 16px;
          padding: 24px;
        }

        .empty-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .empty-desc {
          font-size: 14px;
          color: var(--dash-muted);
          margin-bottom: 18px;
          line-height: 1.45;
        }

        .mobile-toggle {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 30;
          padding: 8px;
          border: 1px solid var(--dash-line);
          border-radius: 8px;
          background: var(--dash-bg);
          color: var(--dash-ink);
          cursor: pointer;
        }

        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 15;
          background: rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 900px) {
          .dash-main {
            padding: 80px 24px 48px;
          }

          .hero {
            grid-template-columns: 1fr;
          }

          .hero-art {
            justify-self: start;
            max-width: 280px;
          }

          .link-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .empties {
            grid-template-columns: 1fr;
          }

          .dash-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100dvh;
            z-index: 20;
            transform: translateX(-100%);
            transition: transform 0.2s ease;
          }

          .dash-sidebar.open {
            transform: translateX(0);
          }

          .mobile-toggle,
          .mobile-overlay {
            display: block;
          }
        }

        @media (max-width: 600px) {
          .link-grid {
            grid-template-columns: 1fr;
          }

          .hero-headline {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
}
