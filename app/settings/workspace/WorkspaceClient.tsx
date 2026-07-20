"use client";

import { useEffect, useState } from "react";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { SettingsShell } from "@/components/settings/SettingsShell";
import { settingsMutate, useSettingsFetch } from "@/components/settings/useSettingsApi";

type Payload = {
  workspace: {
    id: string;
    name: string;
    slug: string;
    timezone: string;
    plan: string;
    planStatus: string;
  };
};

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Australia/Sydney",
];

export default function WorkspaceClient({ session }: { session: SessionData }) {
  const { data, loading, error, reload } = useSettingsFetch<Payload>(
    "/api/settings/workspace"
  );
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (data?.workspace) {
      setName(data.workspace.name);
      setSlug(data.workspace.slug);
      setTimezone(data.workspace.timezone || "UTC");
    }
  }, [data]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setSaveError(null);
    try {
      await settingsMutate("/api/settings/workspace", {
        method: "PATCH",
        body: JSON.stringify({ name, slug, timezone }),
      });
      setMessage("Workspace updated.");
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
      title="Workspace"
      description="Organization defaults for your team and projects."
    >
      {loading ? <p className="settings-muted">Loading…</p> : null}
      {error ? <p className="settings-error">{error}</p> : null}
      {data ? (
        <form className="settings-form" onSubmit={onSave}>
          <div className="settings-badge-row">
            <span className="settings-badge">{data.workspace.plan}</span>
            <span className="settings-badge muted">{data.workspace.planStatus}</span>
          </div>
          <label className="settings-field">
            <span>Workspace name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} />
          </label>
          <label className="settings-field">
            <span>Slug</span>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} required maxLength={40} />
            <small className="settings-help">Used in URLs and API context.</small>
          </label>
          <label className="settings-field">
            <span>Timezone</span>
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </label>
          {message ? <p className="settings-success">{message}</p> : null}
          {saveError ? <p className="settings-error">{saveError}</p> : null}
          <button type="submit" className="settings-btn" disabled={saving}>
            {saving ? "Saving…" : "Save workspace"}
          </button>
        </form>
      ) : null}
    </SettingsShell>
  );
}
