export default function Positioning() {
  return (
    <section id="positioning" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 glow-warm" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Video is not enough
            <br />
            <span className="text-muted">for robotics.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-8">
            <div className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
              A filmmaker wants
            </div>
            <p className="font-display text-xl font-medium leading-relaxed text-muted">
              &ldquo;Make this shot cooler.&rdquo;
            </p>
          </div>

          <div className="rounded-2xl border border-accent/20 bg-accent-dim p-8">
            <div className="mb-4 text-xs font-medium uppercase tracking-widest text-accent">
              A robotics team wants
            </div>
            <p className="font-display text-xl font-medium leading-relaxed text-ink">
              &ldquo;Generate 100,000 variations of a robot picking up a towel
              from a messy bedroom, with RGB, depth, segmentation, object pose,
              robot joint states, action labels, contact events, failure cases,
              and a policy eval report.&rdquo;
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            That&rsquo;s <span className="text-accent">Omposition.</span>
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              stat: "1M+",
              label: "failure scenarios in our library",
            },
            {
              stat: "6",
              label: "embodiment adapters supported",
            },
            {
              stat: "73%",
              label: "avg policy success after synthetic training",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-surface p-6 text-center"
            >
              <div className="font-display text-3xl font-bold text-accent">
                {item.stat}
              </div>
              <div className="mt-2 text-sm text-muted">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
