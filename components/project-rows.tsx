"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import type { Project } from "@/content/projects";

// Preview size (16:10) and its gap from the cursor.
const W = 280;
const H = 175;
const GAP = 24;
const EDGE = 16;

export function ProjectRows({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const shown = useRef(false);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // The preview glides toward the cursor and leans a little into horizontal movement.
  function tick() {
    const el = box.current;
    if (!el) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const p = pos.current, t = target.current;
    const dx = (t.x - p.x) * (still ? 1 : 0.18);
    p.x += dx;
    p.y += (t.y - p.y) * (still ? 1 : 0.18);
    const lean = still ? 0 : Math.max(-6, Math.min(6, dx * 0.4));
    el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${lean.toFixed(2)}deg)`;
    raf.current = Math.abs(t.x - p.x) > 0.5 || Math.abs(t.y - p.y) > 0.5 ? requestAnimationFrame(tick) : 0;
  }

  // Sits to the right of the point, or flips left near the edge, and stays inside the viewport.
  function aim(x: number, y: number) {
    let left = x + GAP;
    if (left + W > innerWidth - EDGE) left = x - GAP - W;
    const top = Math.min(Math.max(y - H / 2, EDGE), innerHeight - H - EDGE);
    target.current = { x: left, y: top };
    // Appear where the cursor is, rather than flying in from the last spot.
    if (!shown.current) pos.current = { ...target.current };
    shown.current = true;
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  }

  function show(i: number) {
    setCurrent(i);
    setVisible(true);
  }

  function hide() {
    setVisible(false);
    shown.current = false;
  }

  function onMove(e: PointerEvent) {
    if (e.pointerType === "mouse") aim(e.clientX, e.clientY);
  }

  function onFocus(i: number, e: FocusEvent<HTMLAnchorElement>) {
    if (!e.currentTarget.matches(":focus-visible")) return;
    const r = e.currentTarget.getBoundingClientRect();
    aim(r.left + r.width * 0.6, r.top + r.height / 2);
    show(i);
  }

  return (
    <div className="grid max-w-[820px]" onPointerMove={onMove} onMouseLeave={hide} onBlur={hide}>
      {projects.map((p, i) => (
        <a
          key={p.name}
          href={p.href}
          onMouseEnter={() => show(i)}
          onFocus={(e) => onFocus(i, e)}
          className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-line py-3 last:border-b max-[900px]:grid-cols-1"
        >
          <span>
            <span className="heading-5 transition-colors duration-300 ease-curve group-hover:text-accent group-focus-visible:text-accent">
              {p.name}
            </span>
            <span className="title-2 ml-3 text-muted transition-colors duration-300 ease-curve group-hover:text-text group-focus-visible:text-text max-[900px]:mt-0.5 max-[900px]:ml-0 max-[900px]:block">
              {p.line}
            </span>
          </span>
          <span className="caption-5 text-dim max-[900px]:hidden">{p.label}</span>
        </a>
      ))}

      {/* One floating preview for the whole list; screenshots crossfade as the hovered row changes. */}
      <div
        ref={box}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-20 will-change-transform max-[900px]:hidden [@media(hover:none)]:hidden"
      >
        <div
          className={`relative aspect-16/10 w-[280px] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)] transition-[opacity,scale] duration-300 ease-curve ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
        >
          {projects.map((p, i) => (
            <Image
              key={p.name}
              src={p.image}
              alt=""
              fill
              sizes="280px"
              loading="eager"
              className={`object-cover object-top transition-opacity duration-300 ease-curve ${i === current ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
