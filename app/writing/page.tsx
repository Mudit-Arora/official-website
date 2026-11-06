import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-label";
import { PostList } from "@/components/writing";

export const metadata: Metadata = {
  title: "Writing · Mudit Arora",
  description: "Posts by Mudit Arora.",
};

export default function WritingPage() {
  return (
    <main className="wrap pt-40 pb-24 max-[900px]:pt-32">
      <div className="load-rise">
        <SectionHeading page index="04">
          Writing
        </SectionHeading>
      </div>
      <div className="load-fade mt-12 [animation-delay:120ms]">
        <PostList />
      </div>
    </main>
  );
}
