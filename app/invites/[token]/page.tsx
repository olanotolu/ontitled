"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function InviteAcceptPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = params.token;
    if (!token) {
      setStatus("error");
      setMessage("No invite token found.");
      return;
    }

    fetch("/api/invites/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setStatus("success");
          setMessage(
            `Invite accepted! You are now a ${data.role} in this workspace.`
          );
        } else {
          setStatus("error");
          setMessage(data.error || "Failed to accept invite.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, [params.token]);

  return (
    <main style={{ maxWidth: 480, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      {status === "loading" && <p>Accepting invite…</p>}
      {status === "error" && (
        <>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            Invite Error
          </h1>
          <p style={{ color: "#555", marginBottom: 24 }}>{message}</p>
        </>
      )}
      {status === "success" && (
        <>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            Invite Accepted
          </h1>
          <p style={{ color: "#555", marginBottom: 24 }}>{message}</p>
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background: "#000",
              color: "#fff",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Go to dashboard
          </button>
        </>
      )}
    </main>
  );
}
