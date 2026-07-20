import { headers } from "next/headers";
import { redirect } from "next/navigation";

/** Legacy /app/dashboard → real Themis app dashboard */
export default async function LegacyDashboardRedirect() {
  const host = (await headers()).get("host") || "";
  const local = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  redirect(
    local
      ? "http://localhost:3001/dashboard"
      : "https://app-ontitled.vercel.app/dashboard"
  );
}
