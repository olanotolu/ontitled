import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { buildThemisProvider } from "@/lib/themis/providers/factory";
import type { ThemisChatRequest } from "@/lib/themis/types";

export async function POST(req: Request) {
  const auth = await requireActiveUser();
  if ("error" in auth) return auth.error;

  let body: ThemisChatRequest;
  try {
    body = (await req.json()) as ThemisChatRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json(
      { error: "messages array is required" },
      { status: 400 }
    );
  }

  const { workspace } = await ensureUserWorkspace(auth.user);

  const provider = buildThemisProvider();

  try {
    const response = await provider.chat(body, {
      userId: auth.user.userId,
      workspaceId: workspace.id,
    });

    return NextResponse.json(response);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Chat failed";
    console.error("Themis chat error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
