"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Album } from "@/content/photos";
import { playSound } from "./click-sound";

// Where each of the three photos sits: resting in the folder (r*), lifted on hover (h*),
// and fanned out when the folder is open (o*). px and degrees; see .album in globals.css.
// The last pose is the front one.
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
  // Which photo of the open album is in front; clicking a photo moves on to the next.
  const [start, setStart] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  function toggle(a: number) {
    setOpen(open === a ? null : a);
    setStart(0);
  }

  // Escape or a click anywhere else closes the open album; the arrow keys page through it.
  useEffect(() => {
    if (open === null) return;
    const n = albums[open].photos.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setStart(0);
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        playSound("paper");
        setStart((s) => (s + (e.key === "ArrowRight" ? 1 : n - 1)) % n);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest("[data-album]")) {
        setOpen(null);
        setStart(0);
      }
    };
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onDown);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("pointerdown", onDown);
    };
  }, [open, albums]);

  return (
    <div
      ref={root}
      className="mx-auto flex max-w-[1032px] flex-wrap justify-center gap-x-6 gap-y-16 pt-36 max-[1240px]:max-w-[504px] max-[900px]:gap-x-3 max-[900px]:gap-y-10 max-[900px]:pt-28"
    >
      {albums.map((album, a) => {
        const isOpen = open === a;
        const n = album.photos.length;
        const first = isOpen ? start : 0;
        const visible = Math.min(3, n);
        return (
          <button
            key={album.name}
            type="button"
            data-album
            data-open={isOpen || undefined}
            aria-expanded={isOpen}
            aria-label={`${album.name}, ${n} photos. ${isOpen ? "Close album; click a photo or use the arrow keys for the next one" : "Open album"}`}
            onClick={() => toggle(a)}
            className={`album relative h-[200px] w-[240px] rounded-xl text-left max-[900px]:[zoom:.66] ${isOpen ? "z-30" : "z-0"}`}
          >
            {/* Back panel */}
            <span className="absolute inset-x-0 bottom-0 h-[176px] rounded-xl border border-line bg-surface-2" />

            {/* Photos. Every photo is rendered in a fixed order; its slot (0 is the front) says
                where it sits. The first three slots are fanned out, the rest wait out of sight
                inside the folder, so paging on deals the front photo back in and the next one
                rises out. */}
            {album.photos.map((p, i) => {
              const slot = (i - first + n) % n;
              const hidden = slot >= visible;
              const pose = POSES[hidden ? POSES.length - 1 : POSES.length - 1 - slot];
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
                "--i": hidden ? 0 : visible - 1 - slot,
                zIndex: hidden ? 0 : visible - slot + (isOpen ? 20 : 0),
              } as CSSProperties;
              return (
                <span
                  key={i}
                  style={style}
                  data-hidden={hidden || undefined}
                  data-sound={isOpen && !hidden ? "paper" : undefined}
                  onClick={(e) => {
                    if (!isOpen || hidden) return;
                    e.stopPropagation();
                    setStart((s) => (s + 1) % n);
                  }}
                  className="album-card absolute bottom-[30px] left-1/2 -ml-[80px] h-[120px] w-[160px] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_16px_32px_-12px_rgba(0,0,0,.45)]"
                >
                  {p.src ? (
                    <Image
                      src={p.src}
                      alt={isOpen && slot === 0 ? p.alt : ""}
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
                isOpen ? "bg-surface" : "bg-white/10 backdrop-blur-xl day:bg-white/50"
              }`}
            />
            <span className="pointer-events-none absolute inset-x-5 bottom-4 z-20 flex items-end justify-between">
              <span>
                <span className="body-3 block text-ink">{album.name}</span>
                <span className="caption-5 text-muted">{isOpen && n > 1 ? `${start + 1} of ${n}` : `${n} items`}</span>
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
