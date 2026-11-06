import type { ReactNode } from "react";

export function SectionLabel({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <h2 className="caption-4 mb-6 flex items-baseline justify-between text-muted">
      <span>{children}</span>
      {aside}
    </h2>
  );
}
