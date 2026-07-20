"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type { SessionData } from "@auth0/nextjs-auth0/types";

/* ——— Icons ——— */

function IconHome() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

function IconFolder() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
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

function IconPlayground() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 20h4M12 18v2" />
    </svg>
  );
}

function IconDocs() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
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

function IconUsers() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 19a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 19a5 5 0 0 1 5.5-4.9" />
    </svg>
  );
}

function IconTeams() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function IconUsage() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19V5M10 19V9M16 19v-6M22 19V7" />
    </svg>
  );
}

function IconBilling() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function IconChevron({ dir = "right" }: { dir?: "right" | "down" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={dir === "down" ? { transform: "rotate(90deg)" } : undefined}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconPanel() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16" />
    </svg>
  );
}

type NavDef = {
  label: string;
  href?: string;
  icon: ReactNode;
  badge?: string;
  hasArrow?: boolean;
  match?: string | string[];
};

const primaryNav: NavDef[] = [
  { label: "Home", href: "/dashboard", icon: <IconHome />, match: "/dashboard" },
  { label: "Projects", icon: <IconFolder /> },
  { label: "Sessions", icon: <IconSessions /> },
  { label: "Playground", href: "/playground", icon: <IconPlayground />, badge: "New", match: "/playground" },
  { label: "Docs", icon: <IconDocs />, hasArrow: true },
];

const manageNav: NavDef[] = [{ label: "API Keys", icon: <IconKey /> }];

const adminNav: NavDef[] = [
  { label: "Users", icon: <IconUsers /> },
  { label: "Teams", icon: <IconTeams /> },
];

const bottomNav: NavDef[] = [
  { label: "Usage", icon: <IconUsage /> },
  { label: "Billing", icon: <IconBilling /> },
];

function isActive(pathname: string, item: NavDef) {
  if (!item.match && !item.href) return false;
  const matches = item.match
    ? Array.isArray(item.match)
      ? item.match
      : [item.match]
    : item.href
      ? [item.href]
      : [];
  return matches.some((m) => pathname === m || pathname.startsWith(`${m}/`));
}

function NavItem({
  item,
  active,
  onNavigate,
}: {
  item: NavDef;
  active: boolean;
  onNavigate?: () => void;
}) {
  const className = `nav-item${active ? " active" : ""}`;
  const content = (
    <>
      <span className="nav-item-left">
        <span className="nav-icon">{item.icon}</span>
        <span>{item.label}</span>
      </span>
      <span className="nav-item-right">
        {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
        {item.hasArrow ? (
          <span className="nav-arrow">
            <IconChevron />
          </span>
        ) : null}
      </span>
    </>
  );

  if (item.href) {
    return (
      <Link href={item.href} className={className} onClick={onNavigate}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onNavigate}>
      {content}
    </button>
  );
}

function getInitials(name: string, email: string): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return email.slice(0, 2).toUpperCase();
}

export function AppShell({
  children,
  mainClassName = "",
  session,
}: {
  children: ReactNode;
  mainClassName?: string;
  session?: SessionData | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setAuthed(true);
    } else {
      router.replace("/login");
    }
  }, [session, router]);

  function closeMenu() {
    setMenuOpen(false);
  }

  if (!authed) {
    return (
      <div className="dash-loading" aria-busy="true">
        <span className="dash-loading-dot" />
      </div>
    );
  }

  const user = session!.user!;
  const userName = user.name || user.email || "User";
  const userEmail = user.email || "";
  const initials = getInitials(userName, userEmail);

  return (
    <div className="dash-root">
      <button
        type="button"
        className="mobile-toggle"
        onClick={() => setMenuOpen((s) => !s)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <IconClose /> : <IconMenu />}
      </button>

      {menuOpen ? (
        <button type="button" className="mobile-overlay" aria-label="Close navigation" onClick={closeMenu} />
      ) : null}

      <aside className={`dash-sidebar${menuOpen ? " open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/dashboard" className="tinker-logo" onClick={closeMenu}>
            [Ontitled]
          </Link>
          <button type="button" className="sidebar-collapse" aria-label="Collapse sidebar">
            <IconPanel />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Main">
          {primaryNav.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              active={isActive(pathname, item)}
              onNavigate={closeMenu}
            />
          ))}

          <div className="nav-section">
            <div className="nav-label">Manage</div>
            {manageNav.map((item) => (
              <NavItem key={item.label} item={item} active={false} onNavigate={closeMenu} />
            ))}
          </div>

          <div className="nav-section">
            <div className="nav-label">Admin</div>
            {adminNav.map((item) => (
              <NavItem key={item.label} item={item} active={false} onNavigate={closeMenu} />
            ))}
          </div>

          <div className="nav-section nav-section-loose">
            {bottomNav.map((item) => (
              <NavItem key={item.label} item={item} active={false} onNavigate={closeMenu} />
            ))}
          </div>
        </nav>

        <div className="sidebar-profile">
          <div className="profile-avatar" aria-hidden="true">
            {initials}
          </div>
          <div className="profile-text">
            <div className="profile-name">{userName}</div>
            <div className="profile-email">{userEmail}</div>
          </div>
          <a
            href="/auth/logout"
            className="profile-menu"
            aria-label="Sign out"
            title="Sign out"
          >
            <IconChevron dir="down" />
          </a>
        </div>
      </aside>

      <main className={`dash-main${mainClassName ? ` ${mainClassName}` : ""}`}>{children}</main>
    </div>
  );
}
