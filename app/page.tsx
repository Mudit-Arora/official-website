import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Photos } from "@/components/photos";
import { Projects } from "@/components/projects";
import { Tagline } from "@/components/tagline";
import { Writing } from "@/components/writing";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Projects />
      <Tagline />
      <Photos />
      <Writing />
    </main>
  );
}
