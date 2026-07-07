import Image from "next/image";

import logo from "./icon.png";

export default function Home() {
  return (
    <>
      <div className="preloader" aria-hidden="true">
        <div className="loader-lockup">
          <div className="loader-center">
            <Image src={logo} alt="" width={132} height={132} priority />
          </div>
          <div className="loader-word loader-right">titled.</div>
        </div>
      </div>

      <main className="splash">
        <section className="intro" aria-labelledby="title">
          <h1 id="title">
            <span className="tagline-prefix">what the future hasn’t named yet.</span>
            <span className="tagline-logo" aria-hidden="true">
              <Image src={logo} alt="" width={112} height={112} priority />
              <span className="tagline-logo-word">titled.</span>
            </span>
          </h1>

          {/* <nav className="links" aria-label="Projects">
            <ul>
              <li>
                <a href="https://agenitry.com" target="_blank" rel="noopener noreferrer">
                  Agenitry
                </a>
              </li>
              <li>
                <a href="https://concya.com" target="_blank" rel="noopener noreferrer">
                  Concya
                  <span className="link-desc">The Agentic General Manager</span>
                </a>
              </li>
              <li>
                <a href="https://neveranda.com" target="_blank" rel="noopener noreferrer">
                  Neveranda
                </a>
              </li>
              <li>
                <a href="https://omposition.com" target="_blank" rel="noopener noreferrer">
                  Omposition
                </a>
              </li>
              <li>
                <a href="https://tribalisim.com" target="_blank" rel="noopener noreferrer">
                  Tribalisim
                </a>
              </li>
              <li>
                <a href="https://umbiance.com" target="_blank" rel="noopener noreferrer">
                  Umbiance
                </a>
              </li>
              <li>
                <a href="https://uninitial.com" target="_blank" rel="noopener noreferrer">
                  Uninitial
                </a>
              </li>
            </ul>
          </nav> */}
        </section>
      </main>
    </>
  );
}
