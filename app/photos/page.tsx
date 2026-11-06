import type { Metadata } from "next";
import { PhotoAlbums } from "@/components/photo-albums";
import { SectionHeading } from "@/components/section-label";
import { albums } from "@/content/photos";

export const metadata: Metadata = {
  title: "Photos · Mudit Arora",
  description: "Photos by Mudit Arora.",
};

export default function PhotosPage() {
  return (
    // Clip sideways at the viewport, not the content column, so open albums at the ends of a
    // row can fan out past it.
    <main className="overflow-x-clip pt-40 pb-24 max-[900px]:pt-32">
      <div className="wrap">
        <div className="load-rise">
          <SectionHeading page index="03" aside={`${albums.length} albums`}>
            Photos
          </SectionHeading>
        </div>
        <div className="load-fade [animation-delay:120ms]">
          <PhotoAlbums albums={albums} />
        </div>
      </div>
    </main>
  );
}
