import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace, now } from "@/lib/settings/ensure";
import { withStore } from "@/lib/settings/store";

export async function POST() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  await ensureUserWorkspace(auth.user);

  await withStore(
    (store) => {
      const p = store.profiles[auth.user.userId];
      if (p) {
        p.deletedAt = now();
        p.updatedAt = now();
      }
      // Revoke all keys for workspaces they own
      for (const w of Object.values(store.workspaces)) {
        if (w.ownerId !== auth.user.userId) continue;
        for (const k of store.apiKeys) {
          if (k.workspaceId === w.id && !k.revokedAt) k.revokedAt = now();
        }
      }
    },
    { mutate: true }
  );

  return NextResponse.json({ ok: true, logout: "/auth/logout" });
}
