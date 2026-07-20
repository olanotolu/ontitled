import { redirect } from "next/navigation";

/** Legacy /app → same-domain Natural login */
export default function LegacyAppRedirect() {
  redirect("/login");
}
