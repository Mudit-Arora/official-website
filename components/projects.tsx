import { projects } from "@/content/projects";
import { ProjectRows } from "./project-rows";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-label";

export function Projects() {
  return (
    <Reveal id="projects" className="pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionHeading index="02" aside={`${projects.length} projects`}>
          Projects
        </SectionHeading>
        <ProjectRows projects={projects} />
      </div>
    </Reveal>
  );
}
