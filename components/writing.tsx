import Link from "next/link";
import { posts } from "@/content/posts";
import { GlyphCard } from "./glyph-card";

const row =
  "group grid grid-cols-[96px_1fr] items-baseline gap-4 border-t border-line py-3 last:border-b max-[900px]:grid-cols-1 max-[900px]:gap-1";

// The list on /writing; shows "Coming soon!" until the first post is published.
export function PostList() {
  if (posts.length === 0) {
    return (
      <div className="max-w-[820px]">
        <GlyphCard>
          <div className="flex h-[360px] flex-col justify-between p-8 max-[900px]:h-[280px] max-[900px]:p-6">
            <span className="caption-4 self-end rounded-sm bg-[#0046de] px-1 text-white/80">MUDIT ARORA</span>
            {/* A solid patch behind the words keeps them readable over the glyphs. */}
            <p className="heading-2 w-fit rounded-lg bg-[#0046de] pr-4" style={{ color: "#fff" }}>
              Coming soon!
            </p>
          </div>
        </GlyphCard>
      </div>
    );
  }
  return (
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
  );
}
