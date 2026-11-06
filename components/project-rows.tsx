"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent } from "react";
import type { Project } from "@/content/projects";
import { LINK_ICONS } from "./icons";

// Preview card width and its gap from the cursor.
const W = 320;
const GAP = 24;
const EDGE = 16;
// Below this width there is no floating card; tapping a row opens its preview in place.
const STACKED = "(max-width: 900px)";

const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

export function ProjectRows({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const shown = useRef(false);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // The card glides toward the cursor and leans a little into horizontal movement.
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
    const h = box.current?.offsetHeight ?? 0;
    let left = x + GAP;
    if (left + W > innerWidth - EDGE) left = x - GAP - W;
    const top = Math.min(Math.max(y - h / 2, EDGE), innerHeight - h - EDGE);
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
    const r = (e.currentTarget.closest("[data-row]") ?? e.currentTarget).getBoundingClientRect();
    aim(r.left + r.width * 0.6, r.top + r.height / 2);
    show(i);
  }

  function onTap(i: number, e: MouseEvent<HTMLAnchorElement>) {
    if (!matchMedia(STACKED).matches) return;
    e.preventDefault();
    setOpen((o) => (o === i ? null : i));
  }

  const p = projects[current];

  return (
    <div className="grid max-w-[820px]" onPointerMove={onMove} onMouseLeave={hide} onBlur={hide}>
      {projects.map((proj, i) => (
        <div
          key={proj.name}
          data-row
          onMouseEnter={() => show(i)}
          className="group relative grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-line py-3 last:border-b max-[900px]:grid-cols-1 max-[900px]:gap-2"
        >
          <span>
            {/* The name is the row's link; its ::after covers the whole row. */}
            <a
              href={proj.links[0].href}
              {...external(proj.links[0].href)}
              onFocus={(e) => onFocus(i, e)}
              onClick={(e) => onTap(i, e)}
              aria-expanded={open === i}
              aria-controls={`preview-${i}`}
              className="heading-5 transition-colors duration-300 ease-curve after:absolute after:inset-0 group-hover:text-accent focus-visible:text-accent"
            >
              {proj.name}
            </a>
            <span className="title-2 ml-3 text-muted transition-colors duration-300 ease-curve group-hover:text-text max-[900px]:mt-0.5 max-[900px]:ml-0 max-[900px]:block">
              {proj.line}
            </span>
          </span>
          <span className="flex items-center gap-4">
            {proj.label && <span className="caption-5 text-dim max-[900px]:hidden">{proj.label}</span>}
            <span className="relative z-10 flex items-center gap-3">
              {proj.links.map((l) => {
                const { icon: Icon, label } = LINK_ICONS[l.kind];
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    {...external(l.href)}
                    aria-label={`${proj.name}: ${label}`}
                    title={label}
                    className="text-dim transition-colors duration-300 ease-curve hover:text-ink"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </span>
          </span>
          {/* Phones: the preview opens in place under the row. */}
          <div
            id={`preview-${i}`}
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-curve min-[901px]:hidden ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <div className="pt-2 pb-1">
                <div className="relative aspect-16/10 overflow-hidden rounded-lg border border-line">
                  <Image src={proj.image} alt="" fill sizes="(max-width: 900px) 100vw, 1px" className="object-cover object-top" />
                </div>
                <p className="body-3 mt-3 text-text">{proj.description}</p>
                <p className="caption-5 mt-2 text-muted">{proj.tech.join(" · ")}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* One floating card for the whole list; it follows the cursor and swaps content per row. */}
      <div
        ref={box}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-20 will-change-transform max-[900px]:hidden [@media(hover:none)]:hidden"
      >
        <div
          className={`w-[320px] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)] transition-[opacity,scale] duration-300 ease-curve ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
        >
          <div className="relative aspect-16/10 border-b border-line">
            {projects.map((proj, i) => (
              <Image
                key={proj.name}
                src={proj.image}
                alt=""
                fill
                sizes="320px"
                loading="eager"
                className={`object-cover object-top transition-opacity duration-300 ease-curve ${i === current ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <div className="p-4">
            <p className="body-3 text-text">{p.description}</p>
            <p className="caption-5 mt-3 text-muted">{p.tech.join(" · ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
