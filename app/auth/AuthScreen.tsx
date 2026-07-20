import type { ReactNode } from "react";
import Link from "next/link";

type Mode = "login" | "signup";

function Wordmark() {
  return (
    <Link href="/" className="auth-wordmark" aria-label="Ontitled">
      <img className="auth-mark" src="/ontitled-favicon-transparent.png" alt="" aria-hidden="true" />
      <span className="auth-wordmark-text">Ontitled</span>
    </Link>
  );
}

function IconGoogle() {
  return (
    <span className="auth-google-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="12" height="12">
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
    </span>
  );
}

function IconMail() {
  return (
    <svg
      className="auth-mail-icon"
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function authHref(params: Record<string, string>) {
  const search = new URLSearchParams({ returnTo: "/onboarding", ...params });
  return `/auth/login?${search.toString()}`;
}

const copy: Record<
  Mode,
  {
    title: string;
    visual: string;
    body: ReactNode;
    screenHint?: string;
  }
> = {
  login: {
    title: "Welcome back",
    // Latest Natural refs use soft sky on both screens
    visual: "/auth/signup-visual.png",
    body: (
      <>
        Need to create an account? <Link href="/signup">Sign up here</Link>.
      </>
    ),
  },
  signup: {
    title: "Welcome to Ontitled",
    visual: "/auth/signup-visual.png",
    body: (
      <>
        Ontitled builds Themis — private creative judgment with verified
        experts, for style, tone, and taste.
      </>
    ),
    screenHint: "signup",
  },
};

export function AuthScreen({ mode, error }: { mode: Mode; error?: string }) {
  const { title, body, visual, screenHint } = copy[mode];

  const googleHref = authHref({
    connection: "google-oauth2",
    ...(screenHint ? { screen_hint: screenHint } : {}),
  });
  const emailHref = authHref(screenHint ? { screen_hint: screenHint } : {});

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <header className="auth-brand">
          <Wordmark />
        </header>

        <main className="auth-main">
          <div className="auth-panel">
            <div className="auth-panel-head">
              <h1 className="auth-title">{title}</h1>
              <p className="auth-sub">{body}</p>
            </div>

            {error ? (
              <div className="auth-error" role="alert">
                {error}
              </div>
            ) : null}

            <div className="auth-actions">
              <a className="auth-btn auth-btn-google" href={googleHref}>
                <IconGoogle />
                <span>Continue with Google</span>
              </a>

              <div className="auth-divider" aria-hidden="true">
                <span>or</span>
              </div>

              <a className="auth-btn auth-btn-email" href={emailHref}>
                <IconMail />
                <span>Continue with email</span>
              </a>
            </div>
          </div>
        </main>

        <footer className="auth-footer">
          <p className="auth-legal">
            By signing up for Ontitled, I agree to Ontitled&apos;s{" "}
            <a href="#">Electronic Communications and Signatures Agreement</a>.
          </p>
          <nav className="auth-footlinks" aria-label="Legal">
            <a href="#">Services Agreement</a>
            <a href="#">Privacy</a>
            <a href="#">Support</a>
          </nav>
        </footer>
      </div>

      {/* Bottom-right 500×500 panel — matches natural.com geometry */}
      <div className="auth-visual-wrap" aria-hidden="true">
        <img className="auth-visual" src={visual} alt="" />
      </div>
    </div>
  );
}
