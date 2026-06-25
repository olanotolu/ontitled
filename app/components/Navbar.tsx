"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Product", href: "#modules" },
  { label: "Demo", href: "#demo" },
  { label: "Why", href: "#positioning" },
  { label: "Output", href: "#output" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface">
            <div className="h-3 w-3 rounded-sm bg-accent" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Omposition
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#demo"
          className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:bg-surface-2"
        >
          Launch Lab
        </a>
      </div>
    </nav>
  );
}
