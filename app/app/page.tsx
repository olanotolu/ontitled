import { headers } from "next/headers";
import { redirect } from "next/navigation";

/** Kill the old fake /app auth wall → real Auth0 Natural login */
export default async function LegacyAppRedirect() {
  const host = (await headers()).get("host") || "";
  const local = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  redirect(
    local
      ? "http://localhost:3001/login"
      : "https://app-ontitled.vercel.app/login"
  );
}
