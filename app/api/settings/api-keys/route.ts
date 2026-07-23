import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import {
  ensureUserWorkspace,
  generateApiKeySecret,
} from "@/lib/settings/ensure";
import { createApiKey, requireMembership } from "@/lib/settings/repository";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const data = await ensureUserWorkspace(auth.user);
  return NextResponse.json({
    keys: data.apiKeys.map((k) => ({
      id: k.id,
      name: k.name,
      keyPrefix: k.keyPrefix,
      scopes: k.scopes,
      createdAt: k.createdAt,
      lastUsedAt: k.lastUsedAt,
    })),
  });
}

export async function POST(req: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const { workspace } = await ensureUserWorkspace(auth.user);
  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    scopes?: string[];
  };
  const name = (body.name || "").trim().slice(0, 64);
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const scopes = Array.isArray(body.scopes)
    ? body.scopes.filter((s) => s === "read" || s === "write")
    : ["read", "write"];
  if (!scopes.length) scopes.push("read");

  try {
    const member = await requireMembership(workspace.id, auth.user.userId);
    if (!member) throw new Error("Forbidden");
    const { secret, keyPrefix, keyHash } = generateApiKeySecret();
    const record = await createApiKey({
      workspaceId: workspace.id,
      name,
      keyPrefix,
      keyHash,
      scopes,
    });
    return NextResponse.json({
      key: {
        id: record.id,
        name: record.name,
        keyPrefix: record.keyPrefix,
        scopes: record.scopes,
        createdAt: record.createdAt,
        secret,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Create failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
