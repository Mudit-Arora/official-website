import type { ReactNode } from "react";

export function SectionLabel({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <h2 className="caption-4 mb-6 flex items-baseline justify-between text-muted">
      <span>{children}</span>
      {aside}
    </h2>
  );
}

export function LabelLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="transition-colors duration-300 ease-curve hover:text-ink">
      {children}
    </a>
  );
}
