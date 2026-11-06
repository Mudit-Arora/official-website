import { LINKS } from "@/content/site";
import { SectionLabel } from "./section-label";

const link =
  "border-b border-dim transition-colors duration-300 ease-curve hover:border-accent hover:text-accent";

export function About() {
  return (
    <section id="about" className="reveal pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionLabel>About</SectionLabel>
        <div className="heading-4 max-w-[820px] space-y-6">
          <p>
            Most of what I do is voice: agents that listen, understand and talk back, and the NLP and language
            model work underneath them. Lately at EzMedTech AI, Uniphore and CRED; before that, machine learning
            at Mayo Clinic.
          </p>
          <p>
            Off the clock I take photos of cities at night, play too many games, and rewatch sitcoms I already know
            the endings to. <span className="text-muted">sf ~ phx ~ del</span>, in that order.
          </p>
        </div>
        <div className="body-3 mt-12 grid grid-cols-3 gap-8 border-t border-line pt-6 max-[900px]:grid-cols-1 max-[900px]:gap-4">
          <div>
            <b className="caption-4 mb-2 block text-muted">Studied</b>
            <span>MS in AI, UC Santa Cruz. BS in CS, Arizona State.</span>
          </div>
          <div>
            <b className="caption-4 mb-2 block text-muted">Won</b>
            <span>CruzHacks 2025. Runner up at the smallest.ai hackathon.</span>
          </div>
          <div>
            <b className="caption-4 mb-2 block text-muted">Elsewhere</b>
            <span>
              <a className={link} href={LINKS.github}>GitHub</a>,{" "}
              <a className={link} href={LINKS.linkedin}>LinkedIn</a>,{" "}
              <a className={link} href={LINKS.x}>X</a>,{" "}
              <a className={link} href={LINKS.instagram}>Instagram</a>. The full story is on the{" "}
              <a className={link} href={LINKS.resume}>resume</a>.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
