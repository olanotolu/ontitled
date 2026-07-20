"use client";

import type { SessionData } from "@auth0/nextjs-auth0/types";
import { SettingsShell } from "@/components/settings/SettingsShell";
import { useSettingsFetch } from "@/components/settings/useSettingsApi";

type Payload = {
  current: { period: string; requests: number; tokens: number; evals: number };
  history: { period: string; requests: number; tokens: number; evals: number }[];
  plan: string;
};

export default function UsageClient({ session }: { session: SessionData }) {
  const { data, loading, error } = useSettingsFetch<Payload>("/api/settings/usage");

  return (
    <SettingsShell
      session={session}
      title="Usage"
      description="Workspace consumption for the current billing period."
    >
      {loading ? <p className="settings-muted">Loading…</p> : null}
      {error ? <p className="settings-error">{error}</p> : null}
      {data ? (
        <>
          <div className="settings-stat-grid">
            <div className="settings-stat">
              <div className="settings-stat-label">Period</div>
              <div className="settings-stat-value">{data.current.period}</div>
            </div>
            <div className="settings-stat">
              <div className="settings-stat-label">API requests</div>
              <div className="settings-stat-value">{data.current.requests.toLocaleString()}</div>
            </div>
            <div className="settings-stat">
              <div className="settings-stat-label">Tokens</div>
              <div className="settings-stat-value">{data.current.tokens.toLocaleString()}</div>
            </div>
            <div className="settings-stat">
              <div className="settings-stat-label">Evals</div>
              <div className="settings-stat-value">{data.current.evals.toLocaleString()}</div>
            </div>
          </div>
          <p className="settings-muted">
            Plan: <strong>{data.plan}</strong>. Metering hooks will attach as product APIs ship.
          </p>
          <section className="settings-card">
            <h2 className="settings-card-title">Recent periods</h2>
            <div className="settings-table-wrap">
              <table className="settings-table">
                <thead>
                  <tr>
                    <th>Period</th>
                    <th>Requests</th>
                    <th>Tokens</th>
                    <th>Evals</th>
                  </tr>
                </thead>
                <tbody>
                  {data.history.map((row) => (
                    <tr key={row.period}>
                      <td>{row.period}</td>
                      <td>{row.requests}</td>
                      <td>{row.tokens}</td>
                      <td>{row.evals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </SettingsShell>
  );
}
