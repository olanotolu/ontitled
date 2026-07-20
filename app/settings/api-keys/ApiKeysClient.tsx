"use client";

import { useState } from "react";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { SettingsShell } from "@/components/settings/SettingsShell";
import { settingsMutate, useSettingsFetch } from "@/components/settings/useSettingsApi";

type KeyRow = {
  id: string;
  name: string;
  keyPrefix: string;
  scopes: string[];
  createdAt: string;
  lastUsedAt: string | null;
};

export default function ApiKeysClient({ session }: { session: SessionData }) {
  const { data, loading, error, reload } = useSettingsFetch<{ keys: KeyRow[] }>(
    "/api/settings/api-keys"
  );
  const [name, setName] = useState("");
  const [scopes, setScopes] = useState({ read: true, write: true });
  const [busy, setBusy] = useState(false);
  const [secret, setSecret] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function createKey(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setSecret(null);
    try {
      const selected = [
        scopes.read ? "read" : null,
        scopes.write ? "write" : null,
      ].filter(Boolean) as string[];
      const res = await settingsMutate<{ key: { secret: string } }>("/api/settings/api-keys", {
        method: "POST",
        body: JSON.stringify({ name, scopes: selected }),
      });
      setSecret(res.key.secret);
      setName("");
      await reload();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Create failed");
    } finally {
      setBusy(false);
    }
  }

  async function revoke(id: string) {
    if (!confirm("Revoke this API key? Apps using it will stop working.")) return;
    setBusy(true);
    setErr(null);
    try {
      await settingsMutate(`/api/settings/api-keys/${id}`, { method: "DELETE" });
      await reload();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Revoke failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SettingsShell
      session={session}
      title="API Keys"
      description="Authenticate programmatic access to Themis APIs."
    >
      {loading ? <p className="settings-muted">Loading…</p> : null}
      {error ? <p className="settings-error">{error}</p> : null}

      <section className="settings-card">
        <h2 className="settings-card-title">Create key</h2>
        <form className="settings-form" onSubmit={createKey}>
          <label className="settings-field">
            <span>Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Production server"
              required
              maxLength={64}
            />
          </label>
          <div className="settings-check-row">
            <label>
              <input
                type="checkbox"
                checked={scopes.read}
                onChange={(e) => setScopes((s) => ({ ...s, read: e.target.checked }))}
              />{" "}
              read
            </label>
            <label>
              <input
                type="checkbox"
                checked={scopes.write}
                onChange={(e) => setScopes((s) => ({ ...s, write: e.target.checked }))}
              />{" "}
              write
            </label>
          </div>
          <button type="submit" className="settings-btn" disabled={busy || (!scopes.read && !scopes.write)}>
            Create key
          </button>
        </form>
        {secret ? (
          <div className="settings-secret-box" role="status">
            <strong>Copy your secret now</strong> — it won’t be shown again.
            <code className="settings-secret">{secret}</code>
            <button
              type="button"
              className="settings-btn ghost"
              onClick={() => navigator.clipboard.writeText(secret)}
            >
              Copy secret
            </button>
          </div>
        ) : null}
        {err ? <p className="settings-error">{err}</p> : null}
      </section>

      <section className="settings-card">
        <h2 className="settings-card-title">Active keys</h2>
        {(data?.keys || []).length === 0 ? (
          <p className="settings-muted">No API keys yet.</p>
        ) : (
          <div className="settings-table-wrap">
            <table className="settings-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Prefix</th>
                  <th>Scopes</th>
                  <th>Created</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data!.keys.map((k) => (
                  <tr key={k.id}>
                    <td>{k.name}</td>
                    <td>
                      <code>{k.keyPrefix}…</code>
                    </td>
                    <td>{k.scopes.join(", ")}</td>
                    <td>{new Date(k.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        type="button"
                        className="settings-btn ghost danger"
                        disabled={busy}
                        onClick={() => revoke(k.id)}
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </SettingsShell>
  );
}
