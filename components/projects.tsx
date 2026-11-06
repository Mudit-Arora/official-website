import { projects } from "@/content/projects";
import { ProjectRows } from "./project-rows";
import { SectionLabel } from "./section-label";

export function Projects() {
  return (
    <section id="projects" className="reveal pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionLabel>Projects</SectionLabel>
        <ProjectRows projects={projects} />
      </div>
    </section>
  );
}
