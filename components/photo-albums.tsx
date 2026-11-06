"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Album } from "@/content/photos";

// Where each of the three photos sits: resting in the folder (r*), lifted on hover (h*),
// and fanned out when the folder is open (o*). px and degrees; see .album in globals.css.
// The last photo is in front.
const POSES = [
  {
    rx: -8,
    ry: 2,
    rr: -3,
    hx: -16,
    hy: -30,
    hr: -7,
    ox: -120,
    oy: -150,
    or: -10,
  },
  { rx: 8, ry: 0, rr: 3, hx: 16, hy: -36, hr: 7, ox: 120, oy: -150, or: 10 },
  { rx: 0, ry: -4, rr: 0, hx: 0, hy: -44, hr: 0, ox: 0, oy: -190, or: 0 },
];

// The front panel: a rounded rectangle with a raised tab on the right, 240 by 140.
const FRONT =
  "path('M0 30 Q0 18 12 18 L100 18 C114 18 116 0 132 0 L228 0 Q240 0 240 12 L240 128 Q240 140 228 140 L12 140 Q0 140 0 128 Z')";

export function PhotoAlbums({ albums }: { albums: Album[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  // Escape or a click anywhere else closes the open album.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest("[data-album]")) setOpen(null);
    };
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onDown);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="mx-auto flex max-w-[1032px] flex-wrap justify-center gap-x-6 gap-y-16 pt-36 max-[1100px]:max-w-[504px] max-[900px]:gap-x-3 max-[900px]:gap-y-10 max-[900px]:pt-28"
    >
      {albums.map((album, a) => {
        const isOpen = open === a;
        const shown = album.photos.slice(0, 3);
        return (
          <button
            key={album.name}
            type="button"
            data-album
            data-open={isOpen || undefined}
            aria-expanded={isOpen}
            aria-label={`${album.name}, ${album.photos.length} photos. ${isOpen ? "Close" : "Open"} album`}
            onClick={() => setOpen(isOpen ? null : a)}
            className={`album relative h-[200px] w-[240px] rounded-xl text-left max-[900px]:[zoom:.66] ${isOpen ? "z-30" : "z-0"}`}
          >
            {/* Back panel */}
            <span className="absolute inset-x-0 bottom-0 h-[176px] rounded-xl border border-line bg-surface-2" />

            {/* Photos */}
            {shown.map((p, i) => {
              const pose = POSES[POSES.length - shown.length + i];
              const style = {
                "--rx": pose.rx,
                "--ry": pose.ry,
                "--rr": pose.rr,
                "--hx": pose.hx,
                "--hy": pose.hy,
                "--hr": pose.hr,
                "--ox": pose.ox,
                "--oy": pose.oy,
                "--or": pose.or,
                "--i": i,
              } as CSSProperties;
              return (
                <span
                  key={i}
                  style={style}
                  className="album-card absolute bottom-[30px] left-1/2 -ml-[80px] h-[120px] w-[160px] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_16px_32px_-12px_rgba(0,0,0,.45)]"
                >
                  {p.src ? (
                    <Image
                      src={p.src}
                      alt={isOpen ? p.alt : ""}
                      fill
                      sizes="200px"
                      loading="eager"
                      className="object-cover"
                    />
                  ) : (
                    <span className="caption-5 absolute inset-0 grid place-items-center p-2 text-center text-dim">
                      {p.alt}
                    </span>
                  )}
                </span>
              );
            })}

            {/* Frosted front panel with the album name; it turns solid while the album is open. */}
            <span
              style={{ clipPath: FRONT }}
              className={`absolute inset-x-0 bottom-0 z-10 h-[140px] transition-[background-color,backdrop-filter] duration-300 ease-curve ${
                isOpen
                  ? "bg-surface"
                  : "bg-white/10 backdrop-blur-xl day:bg-white/50"
              }`}
            />
            <span className="pointer-events-none absolute inset-x-5 bottom-4 z-20 flex items-end justify-between">
              <span>
                <span className="body-3 block text-ink">{album.name}</span>
                <span className="caption-5 text-muted">
                  {album.photos.length} items
                </span>
              </span>
              <span className="grid size-8 place-items-center rounded-full bg-ink text-bg">
                <svg
                  viewBox="0 0 24 24"
                  className={`size-4 transition-transform duration-300 ease-curve ${isOpen ? "rotate-45" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
