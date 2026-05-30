"use client";

import { useState } from "react";

const links = [
  { name: "Umbiance", detail: "sub link / 01" },
  { name: "Neveranda", detail: "sub link / 02" },
  { name: "Agenitry", detail: "sub link / 03" },
  { name: "Tribalisim", detail: "sub link / 04" },
  { name: "Concya", detail: "" },
];

export default function Home() {
  const [active, setActive] = useState("Concya");

  return (
    <main className="page-shell">
      <header className="masthead">
        <p className="kicker">sub links</p>
        <h1>Ontitled</h1>
      </header>

      <nav className="link-list" aria-label="Ontitled sub links">
        {links.map((link) => {
          const isActive = active === link.name;

          return (
            <button
              aria-expanded={isActive}
              className={`sub-link${isActive ? " active" : ""}`}
              key={link.name}
              onClick={() => setActive(link.name)}
              type="button"
            >
              <span className="link-name">{link.name}</span>
              <span className="link-detail">{link.detail}</span>
            </button>
          );
        })}
      </nav>
    </main>
  );
}
