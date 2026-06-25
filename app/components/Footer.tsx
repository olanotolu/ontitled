const footerLinks = {
  Product: ["World Generator", "Task Generator", "Data Engine", "Failure Simulator", "Policy Arena"],
  Research: ["Publications", "World Models", "Sim-to-Real", "Datasets"],
  Company: ["About", "Careers", "Contact", "Press"],
  Resources: ["Documentation", "API Reference", "Changelog", "Status"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            Robots should fail a million times in simulation before failing once
            in your home.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface">
                <div className="h-3 w-3 rounded-sm bg-accent" />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">
                Omposition
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">
              A synthetic simulation lab for humanoid robots.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Omposition. Runway made video
            generative. We make reality trainable.
          </p>
          <div className="flex gap-6">
            {["Twitter", "GitHub", "Discord"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-muted transition-colors hover:text-ink"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
