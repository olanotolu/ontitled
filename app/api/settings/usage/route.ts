import { NextResponse } from "next/server";
import { requireUser } from "@/lib/settings/auth";
import { ensureUserWorkspace } from "@/lib/settings/ensure";
import { getUsageHistory } from "@/lib/settings/repository";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const data = await ensureUserWorkspace(auth.user);
  const history = await getUsageHistory(data.workspace.id, 6);
  return NextResponse.json({
    current: data.usage,
    history,
    plan: data.workspace.plan,
  });
}
