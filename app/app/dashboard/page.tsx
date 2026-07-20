import { redirect } from "next/navigation";

/** Legacy /app/dashboard → real dashboard */
export default function LegacyDashboardRedirect() {
  redirect("/dashboard");
}
