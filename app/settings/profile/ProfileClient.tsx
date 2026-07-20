"use client";

import { useEffect, useState } from "react";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { SettingsShell } from "@/components/settings/SettingsShell";
import { settingsMutate, useSettingsFetch } from "@/components/settings/useSettingsApi";

type ProfilePayload = {
  profile: {
    displayName: string;
    jobTitle: string;
    email: string;
    userId: string;
  };
  auth: { email: string; name: string; userId: string };
};

export default function ProfileClient({ session }: { session: SessionData }) {
  const { data, loading, error, reload } = useSettingsFetch<ProfilePayload>(
    "/api/settings/profile"
  );
  const [displayName, setDisplayName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (data?.profile) {
      setDisplayName(data.profile.displayName || "");
      setJobTitle(data.profile.jobTitle || "");
    }
  }, [data]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setSaveError(null);
    try {
      await settingsMutate("/api/settings/profile", {
        method: "PATCH",
        body: JSON.stringify({ displayName, jobTitle }),
      });
      setMessage("Profile saved.");
      await reload();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SettingsShell
      session={session}
      title="Profile"
      description="Your personal identity on Ontitled."
    >
      {loading ? <p className="settings-muted">Loading…</p> : null}
      {error ? <p className="settings-error">{error}</p> : null}
      {data ? (
        <form className="settings-form" onSubmit={onSave}>
          <label className="settings-field">
            <span>Display name</span>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={80}
              required
            />
          </label>
          <label className="settings-field">
            <span>Job title</span>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              maxLength={80}
              placeholder="Founder, Engineer, Designer…"
            />
          </label>
          <label className="settings-field">
            <span>Email</span>
            <input value={data.auth.email || data.profile.email} disabled />
            <small className="settings-help">Managed by your Auth0 login provider.</small>
          </label>
          <label className="settings-field">
            <span>User ID</span>
            <input value={data.auth.userId} disabled />
          </label>
          {message ? <p className="settings-success">{message}</p> : null}
          {saveError ? <p className="settings-error">{saveError}</p> : null}
          <button type="submit" className="settings-btn" disabled={saving}>
            {saving ? "Saving…" : "Save profile"}
          </button>
        </form>
      ) : null}
    </SettingsShell>
  );
}
