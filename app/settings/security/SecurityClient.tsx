"use client";

import { useState } from "react";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { SettingsShell } from "@/components/settings/SettingsShell";
import { settingsMutate } from "@/components/settings/useSettingsApi";

export default function SecurityClient({ session }: { session: SessionData }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const email = session.user?.email || "";
  const name = session.user?.name || email || "User";

  async function deleteAccount() {
    if (
      !confirm(
        "Delete your Ontitled account? This revokes API keys and signs you out. This cannot be easily undone."
      )
    ) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await settingsMutate<{ logout: string }>("/api/settings/account/delete", {
        method: "POST",
        body: "{}",
      });
      window.location.href = res.logout || "/auth/logout";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
      setBusy(false);
    }
  }

  return (
    <SettingsShell
      session={session}
      title="Security"
      description="Sessions, authentication, and account controls."
    >
      <section className="settings-card">
        <h2 className="settings-card-title">Signed in as</h2>
        <p>
          <strong>{name}</strong>
          <br />
          <span className="settings-muted">{email}</span>
        </p>
        <p className="settings-muted">This browser · active session via Auth0</p>
        <a className="settings-btn" href="/auth/logout">
          Sign out
        </a>
      </section>

      <section className="settings-card">
        <h2 className="settings-card-title">Password &amp; providers</h2>
        <p className="settings-muted">
          Password and social logins are managed by Auth0 (Google / email). Use your identity
          provider settings to change credentials.
        </p>
      </section>

      <section className="settings-card danger-zone">
        <h2 className="settings-card-title">Danger zone</h2>
        <p className="settings-muted">
          Soft-delete your account, revoke workspace API keys you own, and sign out.
        </p>
        {error ? <p className="settings-error">{error}</p> : null}
        <button
          type="button"
          className="settings-btn danger"
          disabled={busy}
          onClick={deleteAccount}
        >
          {busy ? "Deleting…" : "Delete account"}
        </button>
      </section>
    </SettingsShell>
  );
}
