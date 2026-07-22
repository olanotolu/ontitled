import { describe, it, expect } from "vitest";
import { hashApiKey, generateApiKeySecret } from "@/lib/settings/utils";

describe("hashApiKey", () => {
  it("produces SHA-256 hex hash", () => {
    const hash = hashApiKey("test_secret");
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("same input produces same hash", () => {
    expect(hashApiKey("abc")).toBe(hashApiKey("abc"));
  });

  it("different input produces different hash", () => {
    expect(hashApiKey("abc")).not.toBe(hashApiKey("abd"));
  });
});

describe("generateApiKeySecret", () => {
  it("generates prefixed secret with keyPrefix and keyHash", () => {
    const { secret, keyPrefix, keyHash } = generateApiKeySecret();
    expect(secret).toMatch(/^ot_live_/);
    expect(secret.length).toBeGreaterThan(20);
    expect(keyPrefix).toBe(secret.slice(0, 14));
    expect(keyHash).toBe(hashApiKey(secret));
  });

  it("generates unique secrets each time", () => {
    const a = generateApiKeySecret();
    const b = generateApiKeySecret();
    expect(a.secret).not.toBe(b.secret);
    expect(a.keyHash).not.toBe(b.keyHash);
  });
});

describe("JSON backend – findApiKeyByHash", () => {
  it("returns null for unknown hash", async () => {
    const { findApiKeyByHash } = await import("@/lib/settings/repository");
    const key = await findApiKeyByHash(hashApiKey("nonexistent"));
    expect(key).toBeNull();
  });

  it("finds key by hash after creation", async () => {
    const { findApiKeyByHash, createApiKey } = await import("@/lib/settings/repository");
    const { keyHash } = generateApiKeySecret();
    await createApiKey({
      workspaceId: "ws_test",
      name: "test key",
      keyPrefix: "ot_live_xxxxx",
      keyHash,
      scopes: ["read", "write"],
    });
    const key = await findApiKeyByHash(keyHash);
    expect(key).not.toBeNull();
    expect(key!.scopes).toContain("write");
  });
});
