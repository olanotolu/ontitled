"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "signin" | "signup";

const DEV_EMAIL = "panda";
const DEV_PASSWORD = "panda";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`.trim()} aria-label="Ontitled">
      <span className="brackets">[</span>
      Ontitled
      <span className="brackets">]</span>
    </span>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (email.trim() === DEV_EMAIL && password === DEV_PASSWORD) {
        try {
          localStorage.setItem("themis_dev_auth", JSON.stringify({ user: "panda", ts: Date.now() }));
        } catch {}
        router.push("/dashboard");
      } else {
        setLoading(false);
        setError("Invalid credentials. Use panda / panda for dev access.");
      }
    }, 500);
  }

  return (
    <div className="auth-page">
      <aside className="auth-aside" aria-hidden="false">
        <div className="auth-aside-top">
          <Wordmark />
          <p className="aside-kicker">Themis</p>
          <h1 className="aside-headline">The actuarial engine for creative judgment.</h1>
          <p className="aside-copy">
            Private evaluations with verified creative experts — for style, tone, and taste.
          </p>
        </div>
        <p className="auth-aside-bottom aside-meta">[Ontitled] research lab</p>
      </aside>

      <main className="auth-main">
        <div className="auth-panel">
          <div className="mobile-brand">
            <Wordmark />
            <span className="aside-meta">Themis</span>
          </div>

          <div className="auth-panel-head">
            <h2 className="auth-title">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h2>
            <p className="auth-sub">
              {mode === "signin"
                ? "Sign in to continue to your Themis workspace."
                : "Set up access for expert evaluation workflows."}
            </p>
          </div>

          <div className="mode-tabs" role="tablist" aria-label="Account mode">
            <button
              type="button"
              className="mode-tab"
              role="tab"
              aria-selected={mode === "signin"}
              onClick={() => switchMode("signin")}
            >
              Sign in
            </button>
            <button
              type="button"
              className="mode-tab"
              role="tab"
              aria-selected={mode === "signup"}
              onClick={() => switchMode("signup")}
            >
              Sign up
            </button>
          </div>

          <div className="auth-oauth">
            <button
              className="oauth-btn"
              type="button"
              onClick={() => setError("OAuth not wired up yet.")}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"
                />
              </svg>
              Continue with Google
            </button>
            <button
              className="oauth-btn"
              type="button"
              onClick={() => setError("OAuth not wired up yet.")}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          <div className="auth-divider" aria-hidden="true">
            <span>or email</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="auth-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="auth-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="panda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="auth-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="auth-input"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                placeholder="panda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mode === "signin" && (
              <div className="auth-row">
                <span className="auth-hint">Workspace access</span>
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => setError("Password reset is not wired up yet.")}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error ? <p className="auth-error">{error}</p> : null}

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="auth-foot">
            {mode === "signin" ? (
              <>
                New here?{" "}
                <button type="button" onClick={() => switchMode("signup")}>
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have access?{" "}
                <button type="button" onClick={() => switchMode("signin")}>
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
