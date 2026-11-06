import type { ReactNode } from "react";

// Section and page headings: a mono index (the section's place in the nav), the title in
// the serif with the hero's gradient, and an optional note on the right.
export function SectionHeading({
  index,
  children,
  aside,
  page = false,
}: {
  index: string;
  children: ReactNode;
  aside?: ReactNode;
  // Pages get the larger size and an h1. Sections match the 820px content column.
  page?: boolean;
}) {
  const Tag = page ? "h1" : "h2";
  return (
    <div className={`flex items-end justify-between gap-6 ${page ? "mb-4" : "mb-10 max-w-[820px] max-[900px]:mb-8"}`}>
      <Tag className={`flex items-baseline gap-4 ${page ? "heading-1" : "heading-2"}`}>
        <span className="caption-4 text-dim tabular-nums">{index}</span>
        <span className="bg-linear-to-r from-(--h1a) to-(--h1b) bg-clip-text pb-1 text-transparent">{children}</span>
      </Tag>
      {aside && <span className="caption-5 shrink-0 pb-2 text-muted">{aside}</span>}
    </div>
  );
}
