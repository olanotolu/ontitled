import { describe, it, expect, vi, beforeEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: vi.fn(() => false),
  createServiceClient: vi.fn(() => {
    throw new Error("Supabase not available in test");
  }),
}));

const { getSettingsBackend, AccountDeletedError, getProfile, getWorkspaceForUser, softDeleteAccount } =
  await vi.importActual<typeof import("@/lib/settings/repository")>("@/lib/settings/repository");

const { ensureUserWorkspace } = await vi.importActual<typeof import("@/lib/settings/ensure")>(
  "@/lib/settings/ensure"
);

beforeEach(async () => {
  const g = globalThis as Record<string, unknown> & {
    __ontitledSettingsStore?: unknown;
  };
  delete g.__ontitledSettingsStore;
  try {
    await fs.unlink(path.join(process.cwd(), "data", "settings-store.json"));
  } catch {}
});

describe("getSettingsBackend", () => {
  it("returns json when SETTINGS_BACKEND=json", () => {
    vi.stubEnv("SETTINGS_BACKEND", "json");
    vi.stubEnv("NODE_ENV", "production");
    expect(getSettingsBackend()).toBe("json");
    vi.unstubAllEnvs();
  });

  it("returns json in development when Supabase is not configured", () => {
    vi.stubEnv("SETTINGS_BACKEND", "");
    vi.stubEnv("NODE_ENV", "development");
    expect(getSettingsBackend()).toBe("json");
    vi.unstubAllEnvs();
  });

  it("throws in production without Supabase and without json override", () => {
    vi.stubEnv("SETTINGS_BACKEND", "");
    vi.stubEnv("NODE_ENV", "production");
    expect(() => getSettingsBackend()).toThrow("Supabase required in production");
    vi.unstubAllEnvs();
  });
});

describe("AccountDeletedError", () => {
  it("has code ACCOUNT_DELETED", () => {
    const err = new AccountDeletedError("user_1");
    expect(err.code).toBe("ACCOUNT_DELETED");
    expect(err.message).toContain("user_1");
  });
});

describe("JSON backend – profile and workspace lifecycle", () => {
  const userId = "test|user_1";

  it("creates profile and workspace on first ensureUserWorkspace", async () => {
    const bundle = await ensureUserWorkspace({
      userId,
      email: "test@example.com",
      name: "Test User",
    });
    expect(bundle.profile.userId).toBe(userId);
    expect(bundle.profile.email).toBe("test@example.com");
    expect(bundle.profile.deletedAt).toBeNull();
    expect(bundle.workspace.ownerId).toBe(userId);
    expect(bundle.members).toHaveLength(1);
    expect(bundle.members[0].role).toBe("owner");
    expect(bundle.usage.requests).toBe(0);
  });

  it("returns existing profile and workspace on second call", async () => {
    const bundle = await ensureUserWorkspace({
      userId,
      email: "test@example.com",
      name: "Test User",
    });
    expect(bundle.profile.userId).toBe(userId);
    expect(bundle.workspace.ownerId).toBe(userId);
  });

  it("throws AccountDeletedError for soft-deleted user", async () => {
    const uid = "test|deleted_" + Date.now();
    await ensureUserWorkspace({ userId: uid, email: "del@example.com", name: "Del User" });
    await softDeleteAccount(uid);
    await expect(
      ensureUserWorkspace({ userId: uid, email: "del@example.com", name: "Del User" })
    ).rejects.toThrow(AccountDeletedError);
  });

  it("getProfile returns null for unknown user", async () => {
    const p = await getProfile("nonexistent");
    expect(p).toBeNull();
  });

  it("getWorkspaceForUser throws for deleted user", async () => {
    const uid = "test|deleted2_" + Date.now();
    const user = { userId: uid, email: "del2@example.com", name: "Del2 User" };
    await ensureUserWorkspace(user);
    await softDeleteAccount(uid);
    await expect(getWorkspaceForUser(user)).rejects.toThrow(AccountDeletedError);
  });
});
