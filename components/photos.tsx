import Image from "next/image";
import { photos } from "@/content/photos";
import { LINKS } from "@/content/site";
import { LabelLink, SectionLabel } from "./section-label";

export function Photos() {
  return (
    <section id="photos" className="reveal pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionLabel aside={<LabelLink href={LINKS.instagram}>more on Instagram</LabelLink>}>Photos</SectionLabel>
        <p className="title-1 mb-8 max-w-[680px] text-muted">
          Mostly places, mostly at night. Chicago, Mumbai, Dubai, Portland, and a lot of the Bay.
        </p>
        <div className="-mr-(--pad) flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((p, i) => (
            <a
              key={i}
              href={LINKS.instagram}
              className="group relative aspect-4/5 shrink-0 grow-0 basis-[212px] snap-start overflow-hidden rounded-lg bg-surface nth-3:basis-[300px] max-[900px]:basis-[170px] max-[900px]:nth-3:basis-[170px]"
            >
              {p.src ? (
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 900px) 170px, 300px"
                  className="object-cover saturate-[.92] transition-transform duration-500 ease-curve group-hover:scale-[1.03]"
                />
              ) : (
                <span className="caption-5 absolute inset-0 grid place-items-center rounded-lg border border-dashed border-line text-dim">
                  {p.alt}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
