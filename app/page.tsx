import Image from "next/image";

import logo from "./icon.png";

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
        </div>
      </div>

      <main className="splash">
        <a className="mark" href="#" aria-label="Ontitled home">
          <Image src={logo} alt="" width={112} height={112} priority />
          <span className="mark-word">titled.</span>
        </a>

        <section className="intro" aria-labelledby="title">
          <h1 id="title">
            before it becomes obvious, it is ontitled.
          </h1>

          <nav className="links" aria-label="Projects">
            <ul>
              <li>
                <a href="https://concya.com" target="_blank" rel="noopener noreferrer">
                  Concya
                </a>
              </li>
              <li>
                <a href="https://umbiance.com" target="_blank" rel="noopener noreferrer">
                  Umbiance
                </a>
              </li>
              <li>
                <a href="https://omposition.com" target="_blank" rel="noopener noreferrer">
                  Omposition
                </a>
              </li>
              <li>
                <a href="https://neveranda.com" target="_blank" rel="noopener noreferrer">
                  Neveranda
                </a>
              </li>
              <li>
                <a href="https://agenitry.com" target="_blank" rel="noopener noreferrer">
                  Agenitry
                </a>
              </li>
              <li>
                <a href="https://tribalisim.com" target="_blank" rel="noopener noreferrer">
                  Tribalisim
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </main>
    </>
  );
}
