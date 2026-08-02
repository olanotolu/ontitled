import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/settings/api-key-auth";
import { buildDysonProvider } from "@/lib/dyson/providers/factory";
import type { DysonChatRequest } from "@/lib/dyson/types";

export async function POST(req: Request) {
  const auth = await authenticateRequest(req);
  if ("error" in auth) return auth.error;

  let body: DysonChatRequest;
  try {
    body = (await req.json()) as DysonChatRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json(
      { error: "messages array is required" },
      { status: 400 }
    );
  }

  const provider = buildDysonProvider();

  try {
    const response = await provider.chat(body, {
      userId: auth.mode === "session" ? auth.user.userId : auth.userId,
      workspaceId: auth.workspaceId,
    });

    return NextResponse.json(response);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Chat failed";
    console.error("Dyson chat error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
