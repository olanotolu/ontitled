import { env } from "node:process";

export async function sendInviteEmail(params: {
  to: string;
  inviteUrl: string;
  workspaceName: string;
}): Promise<void> {
  const html = `<p>You've been invited to join <strong>${params.workspaceName}</strong> on Ontitled.</p><p><a href="${params.inviteUrl}">Accept invitation</a></p>`;
  const text = `You've been invited to join ${params.workspaceName} on Ontitled.\n\nAccept here: ${params.inviteUrl}`;

  if (env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Ontitled <onboarding@ontitled.com>",
          to: params.to,
          subject: `You've been invited to ${params.workspaceName}`,
          html,
          text,
        }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error("Resend send failed:", res.status, body.slice(0, 200));
      } else {
        console.info("Invite email sent to", params.to);
      }
    } catch (e) {
      console.error("Resend send error:", e instanceof Error ? e.message : String(e));
    }
  } else {
    console.info(
      `[dev] Invite email to ${params.to}\nSubject: You've been invited to ${params.workspaceName}\nLink: ${params.inviteUrl}`
    );
  }
}
