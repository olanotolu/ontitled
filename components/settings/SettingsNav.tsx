"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/workspace", label: "Workspace" },
  { href: "/settings/team", label: "Team" },
  { href: "/settings/api-keys", label: "API Keys" },
  { href: "/settings/usage", label: "Usage" },
  { href: "/settings/billing", label: "Billing" },
  { href: "/settings/security", label: "Security" },
];

export function SettingsNav() {
  const pathname = usePathname();
  return (
    <nav className="settings-nav" aria-label="Settings">
      <div className="settings-nav-title">Settings</div>
      <ul className="settings-nav-list">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`settings-nav-link${active ? " active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
