import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/photos", label: "Photos" },
  { href: "/writing", label: "Writing" },
];

const link = "whitespace-nowrap py-1 transition-colors duration-300 ease-curve hover:text-ink";

export function Nav() {
  return (
    <nav
      aria-label="Site"
      className="caption-4 fixed top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6 rounded-full border border-line bg-(--nav) px-4 py-2 backdrop-blur-[16px] max-[900px]:gap-4 max-[360px]:gap-3 max-[360px]:px-3"
    >
      {/* On phones the name gives way to the section links. */}
      <Link href="/" className={`${link} text-ink max-[480px]:hidden`}>
        Mudit Arora
      </Link>
      <span className="h-4 w-px bg-line max-[480px]:hidden" />
      {/* Section links are plain anchors; pages use Link. */}
      {links.map((l) =>
        l.href.startsWith("/#") ? (
          <a key={l.href} href={l.href} className={`${link} text-muted`}>
            {l.label}
          </a>
        ) : (
          <Link key={l.href} href={l.href} className={`${link} text-muted`}>
            {l.label}
          </Link>
        ),
      )}
      <span className="h-4 w-px bg-line" />
      <ThemeToggle />
    </nav>
  );
}
