const partnerNames = [
  "Umbiance",
  "Neveranda",
  "Agenitry",
  "Tribalisim",
  "Concya",
  "Flora",
  "Framer",
  "Spline",
  "Rive",
  "Webflow",
];

const imageStack = [
  {
    alt: "Creative evaluation interface",
    className: "hero-card hero-card-one",
    src: "https://framerusercontent.com/images/rXZq00I8qUTEM9GWwDnoStXjKKw.png?scale-down-to=1024&width=1182&height=936",
  },
  {
    alt: "Creative portrait sample",
    className: "hero-card hero-card-two",
    src: "https://framerusercontent.com/images/59Plf0mIk2cUZeytrhrQk5WRtY.png?scale-down-to=1024&width=2720&height=3200",
  },
  {
    alt: "Abstract creative benchmark screen",
    className: "hero-card hero-card-three",
    src: "https://framerusercontent.com/images/OxFOG5Cw2HKLKUUNPVXXZFa1rw.png?scale-down-to=1024&width=3840&height=2184",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="Site header">
        <a className="brand" href="#">
          <span className="brand-mark">O</span>
          <span>Ontitled</span>
        </a>

        <nav className="topnav" aria-label="Primary navigation">
          <a href="#research">Research</a>
          <a href="#network">Network</a>
          <a href="#links">Sub links</a>
        </nav>

        <a className="nav-cta" href="mailto:hello@ontitled.studio">
          Request partnership
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Powered by creative judgment</p>
          <h1 id="hero-title">
            A frontier studio making taste visible for the next creative web.
          </h1>
          <div className="hero-actions">
            <a className="primary-cta" href="mailto:hello@ontitled.studio">
              Request partnership
            </a>
            <a className="text-link" href="#links">
              Explore links
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Creative image composition">
          <div className="orbital-label label-top">Human taste</div>
          {imageStack.map((image) => (
            <img
              alt={image.alt}
              className={image.className}
              key={image.src}
              src={image.src}
            />
          ))}
          <div className="orbital-label label-bottom">AI craft</div>
        </div>
      </section>

      <section className="partner-band" id="links" aria-label="Ontitled links">
        <div className="marquee-row">
          {[...partnerNames, ...partnerNames].map((name, index) => (
            <span key={`${name}-${index}`}>{name}</span>
          ))}
        </div>
      </section>

      <section className="statement" id="research">
        <p>Human creativity keeps evolving.</p>
        <p>We make sure it leads.</p>
      </section>

      <section className="ecosystem" id="network" aria-label="Ecosystem cards">
        <article>
          <span>Public Evaluations</span>
          <h2>Creative Arena</h2>
          <p>
            Outputs go head to head. Real taste decides what survives.
          </p>
        </article>
        <article>
          <span>Research & Insight</span>
          <h2>Human Benchmark</h2>
          <p>
            A sharper signal for whether creative work actually feels good.
          </p>
        </article>
        <article>
          <span>Private Systems</span>
          <h2>Creative Data</h2>
          <p>
            Preference layers built from people who know the standard.
          </p>
        </article>
      </section>
    </main>
  );
}
