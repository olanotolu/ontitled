import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import {
  ensureUserWorkspace,
  generateApiKeySecret,
  id,
  now,
} from "@/lib/settings/ensure";
import { withStore } from "@/lib/settings/store";

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

  const { secret, keyPrefix, keyHash } = generateApiKeySecret();
  const record = await withStore(
    (store) => {
      const member = store.members.find(
        (m) => m.workspaceId === workspace.id && m.userId === auth.user.userId
      );
      if (!member) throw new Error("Forbidden");
      const row = {
        id: id("key"),
        workspaceId: workspace.id,
        name,
        keyPrefix,
        keyHash,
        scopes,
        createdAt: now(),
        lastUsedAt: null,
        revokedAt: null,
      };
      store.apiKeys.push(row);
      return row;
    },
    { mutate: true }
  );

  return NextResponse.json({
    key: {
      id: record.id,
      name: record.name,
      keyPrefix: record.keyPrefix,
      scopes: record.scopes,
      createdAt: record.createdAt,
      secret, // shown once
    },
  });
}
