import { projects } from "@/content/projects";
import { LINKS } from "@/content/site";
import { ProjectRows } from "./project-rows";
import { LabelLink, SectionLabel } from "./section-label";

export function Projects() {
  return (
    <section id="projects" className="reveal pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionLabel aside={<LabelLink href={LINKS.github}>all twelve on GitHub</LabelLink>}>Projects</SectionLabel>
        <ProjectRows projects={projects} />
      </div>
    </section>
  );
}
