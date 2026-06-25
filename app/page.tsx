import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Modules from "./components/Modules";
import Demo from "./components/Demo";
import Positioning from "./components/Positioning";
import OutputShowcase from "./components/OutputShowcase";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Modules />
        <Demo />
        <Positioning />
        <OutputShowcase />
      </main>
      <Footer />
    </>
  );
}
