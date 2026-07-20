"use client";

import type { SessionData } from "@auth0/nextjs-auth0/types";
import { SettingsShell } from "@/components/settings/SettingsShell";
import { useSettingsFetch } from "@/components/settings/useSettingsApi";

type Payload = {
  plan: string;
  status: string;
  paymentMethod: string | null;
  billingEmail: string;
  portalAvailable: boolean;
  message: string;
};

export default function BillingClient({ session }: { session: SessionData }) {
  const { data, loading, error } = useSettingsFetch<Payload>("/api/settings/billing");

  return (
    <SettingsShell
      session={session}
      title="Billing"
      description="Plan, invoices, and payment methods."
    >
      {loading ? <p className="settings-muted">Loading…</p> : null}
      {error ? <p className="settings-error">{error}</p> : null}
      {data ? (
        <div className="settings-card">
          <div className="settings-badge-row">
            <span className="settings-badge">{data.plan}</span>
            <span className="settings-badge muted">{data.status}</span>
          </div>
          <dl className="settings-dl">
            <div>
              <dt>Billing email</dt>
              <dd>{data.billingEmail || "—"}</dd>
            </div>
            <div>
              <dt>Payment method</dt>
              <dd>{data.paymentMethod || "None on file"}</dd>
            </div>
          </dl>
          <p className="settings-muted">{data.message}</p>
          <button type="button" className="settings-btn" disabled={!data.portalAvailable}>
            {data.portalAvailable ? "Manage billing" : "Billing portal coming soon"}
          </button>
        </div>
      ) : null}
    </SettingsShell>
  );
}
