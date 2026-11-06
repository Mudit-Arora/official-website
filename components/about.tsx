import { LINKS } from "@/content/site";
import { SectionLabel } from "./section-label";

const link =
  "border-b border-dim transition-colors duration-300 ease-curve hover:border-accent hover:text-accent";

export function About() {
  return (
    <section id="about" className="reveal pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionLabel>About</SectionLabel>
        <p className="heading-4 max-w-[820px]">
          Now at{" "}
          <a className={link} href={LINKS.synhawk}>
            Synhawk
          </a>
          ; before that, EzMedTech AI, Uniphore, CRED and Mayo Clinic. Off the clock: night photos, too many games,
          sitcoms on repeat.
        </p>
        <div className="body-3 mt-12 border-t border-line pt-6">
          <b className="caption-4 mb-2 block text-muted">Studied</b>
          <span>MS in AI, UC Santa Cruz. BS in CS, Arizona State.</span>
        </div>
      </div>
    </section>
  );
}
