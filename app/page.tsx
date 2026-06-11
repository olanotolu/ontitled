export default function Home() {
  return (
    <>
      <div className="preloader" aria-hidden="true">
        <div className="loader-lockup">
          <div className="loader-word loader-left">Ontitled</div>
          <div className="loader-center">
            <img
              src="https://framerusercontent.com/images/rXZq00I8qUTEM9GWwDnoStXjKKw.png?scale-down-to=512&width=1182&height=936"
              alt=""
            />
            <span className="corner corner-tl" />
            <span className="corner corner-tr" />
            <span className="corner corner-bl" />
            <span className="corner corner-br" />
          </div>
          <div className="loader-word loader-right">Labs</div>
        </div>
      </div>

      <main className="splash">
        <a className="mark" href="#" aria-label="Ontitled home">
          On.
        </a>

        <section className="intro" aria-labelledby="title">
          <h1 id="title">
            A frontier lab for agentic intelligence.
          </h1>
        </section>
      </main>
    </>
  );
}
