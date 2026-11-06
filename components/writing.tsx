import Link from "next/link";
import { posts } from "@/content/posts";
import { SectionLabel } from "./section-label";

const row =
  "group grid grid-cols-[96px_1fr] items-baseline gap-4 border-t border-line py-3 last:border-b max-[900px]:grid-cols-1 max-[900px]:gap-1";

export function Writing() {
  return (
    <section id="writing" className="reveal pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionLabel aside={posts.some((p) => p.slug) ? undefined : <span>starting soon</span>}>Writing</SectionLabel>
        <div className="grid max-w-[820px]">
          {posts.map((p) => {
            const content = (
              <>
                <span className="caption-5 text-dim">{p.date ?? "draft"}</span>
                <span className="heading-5 transition-colors duration-300 ease-curve group-hover:text-accent">
                  {p.title}
                  {p.tag && (
                    <span className="caption-5 ml-3 rounded-full border border-line px-2 py-0.5 align-middle text-dim">
                      {p.tag}
                    </span>
                  )}
                </span>
              </>
            );
            // Drafts are listed but not linked, so there are no dead links.
            return p.slug ? (
              <Link key={p.title} href={`/writing/${p.slug}`} className={row}>
                {content}
              </Link>
            ) : (
              <div key={p.title} className={row}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
