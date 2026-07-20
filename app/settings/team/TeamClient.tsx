"use client";

import { useState } from "react";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { SettingsShell } from "@/components/settings/SettingsShell";
import { settingsMutate, useSettingsFetch } from "@/components/settings/useSettingsApi";

type Payload = {
  members: { userId: string; email: string; role: string; createdAt: string }[];
  invites: {
    id: string;
    email: string;
    role: string;
    expiresAt: string;
    createdAt: string;
    inviteUrl: string;
  }[];
};

export default function TeamClient({ session }: { session: SessionData }) {
  const { data, loading, error, reload } = useSettingsFetch<Payload>("/api/settings/team");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"member" | "admin">("member");
  const [busy, setBusy] = useState(false);
  const [lastInviteUrl, setLastInviteUrl] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await settingsMutate<{ invite: { inviteUrl: string } }>(
        "/api/settings/team/invites",
        { method: "POST", body: JSON.stringify({ email, role }) }
      );
      setLastInviteUrl(res.invite.inviteUrl);
      setMsg("Invite created. Share the link below (email delivery coming soon).");
      setEmail("");
      await reload();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Invite failed");
    } finally {
      setBusy(false);
    }
  }

  async function revokeInvite(id: string) {
    setBusy(true);
    setErr(null);
    try {
      await settingsMutate(`/api/settings/team/invites/${id}`, { method: "DELETE" });
      await reload();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Revoke failed");
    } finally {
      setBusy(false);
    }
  }

  async function removeMember(userId: string) {
    if (!confirm("Remove this member from the workspace?")) return;
    setBusy(true);
    setErr(null);
    try {
      await settingsMutate(`/api/settings/team/members/${encodeURIComponent(userId)}`, {
        method: "DELETE",
      });
      await reload();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Remove failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SettingsShell
      session={session}
      title="Team"
      description="Members and invites for your workspace."
    >
      {loading ? <p className="settings-muted">Loading…</p> : null}
      {error ? <p className="settings-error">{error}</p> : null}

      <section className="settings-card">
        <h2 className="settings-card-title">Invite teammate</h2>
        <form className="settings-form inline" onSubmit={invite}>
          <label className="settings-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@company.com"
            />
          </label>
          <label className="settings-field">
            <span>Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value as "member" | "admin")}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit" className="settings-btn" disabled={busy}>
            Send invite
          </button>
        </form>
        {msg ? <p className="settings-success">{msg}</p> : null}
        {lastInviteUrl ? (
          <p className="settings-invite-url">
            <code>{lastInviteUrl}</code>
            <button
              type="button"
              className="settings-btn ghost"
              onClick={() => navigator.clipboard.writeText(lastInviteUrl)}
            >
              Copy
            </button>
          </p>
        ) : null}
        {err ? <p className="settings-error">{err}</p> : null}
      </section>

      <section className="settings-card">
        <h2 className="settings-card-title">Members</h2>
        <div className="settings-table-wrap">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {(data?.members || []).map((m) => (
                <tr key={m.userId}>
                  <td>{m.email || m.userId}</td>
                  <td>
                    <span className="settings-badge muted">{m.role}</span>
                  </td>
                  <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td>
                    {m.role !== "owner" ? (
                      <button
                        type="button"
                        className="settings-btn ghost danger"
                        disabled={busy}
                        onClick={() => removeMember(m.userId)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="settings-card">
        <h2 className="settings-card-title">Pending invites</h2>
        {(data?.invites || []).length === 0 ? (
          <p className="settings-muted">No pending invites.</p>
        ) : (
          <div className="settings-table-wrap">
            <table className="settings-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Expires</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data!.invites.map((i) => (
                  <tr key={i.id}>
                    <td>{i.email}</td>
                    <td>{i.role}</td>
                    <td>{new Date(i.expiresAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        type="button"
                        className="settings-btn ghost"
                        onClick={() => navigator.clipboard.writeText(i.inviteUrl)}
                      >
                        Copy link
                      </button>
                      <button
                        type="button"
                        className="settings-btn ghost danger"
                        disabled={busy}
                        onClick={() => revokeInvite(i.id)}
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
