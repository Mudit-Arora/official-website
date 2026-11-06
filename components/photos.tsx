import Image from "next/image";
import type { CSSProperties } from "react";
import { photos } from "@/content/photos";
import { LINKS } from "@/content/site";
import { SectionLabel } from "./section-label";

// Five slots, left to right: where each photo rests inside the folder (c*) and where it
// fans out to when the folder opens. Numbers are px and degrees; see .folder in globals.css.
const SLOTS = [
  { x: -170, y: -118, r: -14, cx: -10, cy: -14, cr: -4 },
  { x: -88, y: -148, r: -7, cx: -5, cy: -18, cr: -2 },
  { x: 0, y: -160, r: 0, cx: 0, cy: -22, cr: 0 },
  { x: 88, y: -148, r: 7, cx: 5, cy: -18, cr: 2 },
  { x: 170, y: -118, r: 14, cx: 10, cy: -14, cr: 4 },
];
// The first photo takes the middle slot, the next ones fill outward.
const ORDER = [2, 1, 3, 0, 4];

export function Photos() {
  const shown = photos.slice(0, 5);

  return (
    <section id="photos" className="reveal pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <SectionLabel>Photos</SectionLabel>
        <a
          href={LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Photos, on Instagram"
          className="folder group mx-auto flex w-[300px] flex-col items-center rounded-lg outline-offset-8"
        >
          {/* Room above the folder for the photos to fan into. */}
          <div className="relative h-[380px] w-full max-[900px]:h-[300px]">
            <div className="absolute inset-x-0 bottom-0 h-[220px]">
              <div className="absolute top-0 left-0 h-[28px] w-[110px] rounded-t-xl bg-(--folder-back)" />
              <div className="absolute inset-x-0 bottom-0 h-[200px] rounded-xl bg-(--folder-back)" />

              {shown.map((p, i) => {
                const slot = ORDER[i];
                const s = SLOTS[slot];
                const style = {
                  "--x": s.x,
                  "--y": s.y,
                  "--r": s.r,
                  "--cx": s.cx,
                  "--cy": s.cy,
                  "--cr": s.cr,
                  "--i": Math.abs(slot - 2),
                  zIndex: 5 - Math.abs(slot - 2),
                } as CSSProperties;
                return (
                  <div
                    key={i}
                    style={style}
                    className="folder-card absolute bottom-[28px] left-1/2 -ml-[62px] aspect-4/5 w-[124px] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_20px_40px_-16px_rgba(0,0,0,.6)]"
                  >
                    {p.src ? (
                      <Image src={p.src} alt={p.alt} fill sizes="140px" className="object-cover" />
                    ) : (
                      <span className="caption-5 absolute inset-0 grid place-items-center border border-dashed border-line p-2 text-center break-all text-dim">
                        {p.alt}
                      </span>
                    )}
                  </div>
                );
              })}

              <div className="folder-front absolute inset-x-0 bottom-0 z-10 h-[160px] rounded-xl border-t border-white/25 bg-(--folder-front) shadow-[0_-8px_24px_-12px_rgba(0,0,0,.35)]" />
            </div>
          </div>
          <span className="caption-4 mt-4 text-ink">photos</span>
          <span className="caption-5 mt-1 text-dim">on Instagram</span>
        </a>
      </div>
    </section>
  );
}
