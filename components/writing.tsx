import Link from "next/link";
import { posts } from "@/content/posts";
import { SectionLabel } from "./section-label";

const row =
  "group grid grid-cols-[96px_1fr] items-baseline gap-4 border-t border-line py-3 last:border-b max-[900px]:grid-cols-1 max-[900px]:gap-1";

export function Writing() {
  return (
    <section id="writing" className="reveal pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionLabel>Writing</SectionLabel>
        {posts.length === 0 ? (
          // Shown until the first post is published.
          <p className="heading-5 max-w-[820px] border-y border-line py-3 text-muted">Coming soon!</p>
        ) : (
          <div className="grid max-w-[820px]">
            {posts.map((p) => (
              <Link key={p.slug} href={`/writing/${p.slug}`} className={row}>
                <span className="caption-5 text-dim">{p.date}</span>
                <span className="heading-5 transition-colors duration-300 ease-curve group-hover:text-accent">
                  {p.title}
                  {p.tag && (
                    <span className="caption-5 ml-3 rounded-full border border-line px-2 py-0.5 align-middle text-dim">
                      {p.tag}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
