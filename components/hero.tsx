import { LINKS } from "@/content/site";
import { Greeting } from "./greeting";
import { SOCIAL_ICONS } from "./icons";
import { Scene } from "./scene";

const socials = [
  { href: LINKS.github, label: "GitHub", icon: SOCIAL_ICONS.github },
  { href: LINKS.linkedin, label: "LinkedIn", icon: SOCIAL_ICONS.linkedin },
  { href: LINKS.x, label: "X", icon: SOCIAL_ICONS.x },
  { href: LINKS.instagram, label: "Instagram", icon: SOCIAL_ICONS.instagram },
  { href: LINKS.resume, label: "Resume", icon: SOCIAL_ICONS.resume },
];

export function Hero() {
  return (
    <header>
      <div className="wrap grid min-h-screen grid-cols-[1fr_560px] items-center gap-12 pt-20 pb-10 max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[900px]:pt-24">
        {/* A container, so the roles line can stack whenever it does not fit on one line. */}
        <div className="@container">
          <Greeting />
          <p className="load-fade mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-base/6 font-medium text-muted [animation-delay:120ms] @max-[36rem]:flex-col">
            <span>Full Time Developer</span>
            <span aria-hidden="true" className="text-dim @max-[36rem]:hidden">|</span>
            <span>Part Time Gamer</span>
            <span aria-hidden="true" className="text-dim @max-[36rem]:hidden">|</span>
            <span>All Time Learner</span>
          </p>
          <div className="load-fade mt-6 flex items-center gap-5 [animation-delay:200ms]">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="text-muted transition-[color,translate] duration-300 ease-curve hover:-translate-y-px hover:text-ink"
              >
                <Icon className="size-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <Scene />
          <p className="caption-5 mt-4 text-center text-balance text-dim">
            <b className="font-medium text-muted">drag</b> to look around &nbsp; <b className="font-medium text-muted">hover</b>{" "}
            anything &nbsp; <b className="font-medium text-muted">click</b> to go there
          </p>
        </div>
      </div>
    </header>
  );
}
