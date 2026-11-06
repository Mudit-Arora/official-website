import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { RevealObserver } from "@/components/reveal-observer";
import { Tagline } from "@/components/tagline";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Projects />
      <Tagline />
      <RevealObserver />
    </main>
  );
}
