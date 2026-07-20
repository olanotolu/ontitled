import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — [Ontitled]",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <div className="nf-page">
      <div className="nf-noise" aria-hidden="true" />

      <header className="nf-header">
        <Link href="/" className="nf-wordmark">
          [Ontitled]
        </Link>
        <nav className="nf-nav" aria-label="Primary">
          <Link href="/themis">Themis</Link>
          <Link href="/index">Index</Link>
          <Link href="/company">Company</Link>
        </nav>
      </header>

      <main className="nf-main">
        <p className="nf-kicker">Error 404</p>
        <h1 className="nf-title">This page is untitled.</h1>
        <p className="nf-body">
          The path you followed doesn&apos;t lead anywhere on this site.
          It may have moved, or it may never have existed.
        </p>

        <div className="nf-actions">
          <Link href="/" className="nf-btn nf-btn-primary">
            Back home
          </Link>
          <Link href="/index" className="nf-btn nf-btn-ghost">
            Explore Index
          </Link>
          <Link href="/themis" className="nf-btn nf-btn-ghost">
            Try Themis
          </Link>
        </div>

        <ul className="nf-links" aria-label="Helpful links">
          <li>
            <Link href="/company">About the lab</Link>
          </li>
          <li>
            <Link href="/our-thesis">Our thesis</Link>
          </li>
          <li>
            <Link href="/login">Sign in</Link>
          </li>
        </ul>
      </main>

      <div className="nf-mark" aria-hidden="true">
        404
      </div>
    </div>
  );
}
