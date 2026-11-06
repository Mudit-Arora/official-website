import { LINKS } from "@/content/site";

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
        <div className="caption-5 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-muted">
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
