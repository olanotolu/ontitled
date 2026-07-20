"use client";

import type { ReactNode } from "react";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { AppShell } from "@/components/AppShell";
import { SettingsNav } from "./SettingsNav";

export function SettingsShell({
  session,
  title,
  description,
  children,
}: {
  session: SessionData | null | undefined;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <AppShell session={session}>
      <div className="settings-page">
        <SettingsNav />
        <div className="settings-main">
          <header className="settings-header">
            <h1 className="settings-title">{title}</h1>
            {description ? <p className="settings-desc">{description}</p> : null}
          </header>
          <div className="settings-body">{children}</div>
        </div>
      </div>
    </AppShell>
  );
}
