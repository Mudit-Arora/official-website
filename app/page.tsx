import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main className="pb-24">
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
