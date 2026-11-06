import Image from "next/image";
import { projects } from "@/content/projects";
import { LINKS } from "@/content/site";
import { LabelLink, SectionLabel } from "./section-label";

export function Projects() {
  return (
    <section id="projects" className="reveal pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionLabel aside={<LabelLink href={LINKS.github}>all twelve on GitHub</LabelLink>}>Projects</SectionLabel>
        <div className="grid max-w-[820px]">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.href}
              className="group relative grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-line py-3 last:border-b max-[900px]:grid-cols-1"
            >
              <span>
                <span className="heading-5 transition-colors duration-300 ease-curve group-hover:text-accent group-focus-visible:text-accent">
                  {p.name}
                </span>
                <span className="title-2 ml-3 text-muted transition-colors duration-300 ease-curve group-hover:text-text group-focus-visible:text-text max-[900px]:mt-0.5 max-[900px]:ml-0 max-[900px]:block">
                  {p.line}
                </span>
              </span>
              <span className="caption-5 text-dim max-[900px]:hidden">{p.label}</span>
              {/* Tilted screenshot on hover. Hidden where it would run past the page edge. */}
              <div className="pointer-events-none absolute top-1/2 -right-[262px] aspect-16/10 w-[236px] -translate-y-1/2 rotate-[1.5deg] scale-[.96] overflow-hidden rounded-lg border border-line bg-surface opacity-0 shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)] [transition:opacity_.3s_var(--curve),scale_.5s_var(--curve)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 max-[1140px]:hidden">
                <Image src={p.image} alt={p.alt} fill sizes="236px" className="object-cover object-top" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
