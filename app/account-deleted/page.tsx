import Link from "next/link";

export default function AccountDeletedPage() {
  return (
    <main style={{ maxWidth: 480, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
        Account Deleted
      </h1>
      <p style={{ color: "#555", lineHeight: 1.6, marginBottom: 24 }}>
        Your account has been permanently deleted. If you believe this was a mistake
        or need assistance, please contact support.
      </p>
      <Link
        href="mailto:support@ontitled.com"
        style={{
          color: "#0066cc",
          textDecoration: "underline",
          fontSize: 16,
        }}
      >
        support@ontitled.com
      </Link>
    </main>
  );
}
