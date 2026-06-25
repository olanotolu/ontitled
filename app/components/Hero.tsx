export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 glow-accent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-accent pulse-dot" />
          <span className="text-xs font-medium tracking-wide text-muted">
            Synthetic Simulation Lab for Humanoid Robots
          </span>
        </div>

        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          The sandbox where robots
          <br />
          learn before they enter
          <br />
          <span className="text-accent">the world.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base text-muted sm:text-lg md:text-xl">
          Generate worlds, tasks, failures, and annotated synthetic data for
          humanoid robots — before touching hardware.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#demo"
            className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(94,234,212,0.3)]"
          >
            Launch Lab
          </a>
          <a
            href="#modules"
            className="rounded-full border border-border bg-surface/60 px-8 py-3.5 text-sm font-semibold text-ink backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-surface-2"
          >
            Explore Modules
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-muted">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold text-ink">
              10,000+
            </span>
            <span>scenarios generated</span>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold text-ink">
              50+
            </span>
            <span>task types</span>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold text-ink">
              6
            </span>
            <span>embodiments</span>
          </div>
        </div>
      </div>
    </section>
  );
}
