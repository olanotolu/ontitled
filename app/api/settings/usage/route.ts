import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { withStore } from "@/lib/settings/store";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const data = await ensureUserWorkspace(auth.user);
  const history = await withStore((store) =>
    store.usage
      .filter((u) => u.workspaceId === data.workspace.id)
      .sort((a, b) => b.period.localeCompare(a.period))
      .slice(0, 6)
  );
  return NextResponse.json({
    current: data.usage,
    history,
    plan: data.workspace.plan,
  });
}
