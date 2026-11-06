import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#photos", label: "Photos" },
  { href: "/#writing", label: "Writing" },
];

const link = "whitespace-nowrap py-1 transition-colors duration-300 ease-curve hover:text-ink";

export function Nav() {
  return (
    <nav
      aria-label="Site"
      className="caption-4 fixed top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6 rounded-full border border-line bg-(--nav) px-4 py-2 backdrop-blur-[16px]"
    >
      <Link href="/" className={`${link} text-ink`}>
        Mudit Arora
      </Link>
      <span className="h-4 w-px bg-line max-[900px]:hidden" />
      {links.map((l) => (
        <a key={l.href} href={l.href} className={`${link} text-muted max-[900px]:hidden`}>
          {l.label}
        </a>
      ))}
      <span className="h-4 w-px bg-line" />
      <ThemeToggle />
    </nav>
  );
}
