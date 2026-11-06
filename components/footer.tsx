import { EMAIL, LINKS } from "@/content/site";
import { EmailButton } from "./email-button";

const meta = [
  { href: LINKS.github, label: "GitHub" },
  { href: LINKS.linkedin, label: "LinkedIn" },
  { href: LINKS.x, label: "X" },
  { href: LINKS.instagram, label: "Instagram" },
  { href: LINKS.resume, label: "Resume" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer id="contact" className="reveal pt-24 pb-16">
      <div className="wrap">
        <p className="heading-2 max-w-[680px] text-balance">
          Working on something with voice in it? I would like to hear about it.
        </p>
        <div className="mt-8 flex items-center gap-6 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-4">
          <EmailButton />
          <span className="caption-5 text-dim">{EMAIL}</span>
        </div>
        <div className="caption-5 mt-16 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-muted">
          <span>Bay Area, California</span>
          <span className="flex flex-wrap gap-4">
            {meta.map((m) => (
              <a key={m.label} href={m.href} className="transition-colors duration-300 ease-curve hover:text-ink">
                {m.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
