"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

// Ported from design/prototype/index.html (renderScene). The room is built once from boxes;
// day and night only change CSS variables, so a theme switch never redraws it.

const THEMES = {
  night: { floor: "#1c2531", grid: "#222d3a", wallR: "#17202a", wallL: "#141c25", wf: 0.8, sky: "#0a1626", sun: "#e9e2c9", bridge: "#2a1c1c", mullion: "#17202a", frame: "#2a3644", desk: "#8a6a4a", spill: 0.06, glow: true, bulb: "#f0b64a", lead: "#34404f" },
  day: { floor: "#D9CDB9", grid: "#CFC2AC", wallR: "#F3F5FA", wallL: "#EEF1F7", wf: 0.9, sky: "#BFE0FF", sun: "#FEED65", bridge: "#3A2F2F", mullion: "#DADEE9", frame: "#B8C0D4", desk: "#B98D62", spill: 0, glow: false, bulb: "#E9E3C8", lead: "#B8C0D4" },
};
type Palette = (typeof THEMES)["night"];
type ColorKey = { [K in keyof Palette]: Palette[K] extends string ? K : never }[keyof Palette];
// A shade factor, or one that depends on the theme (the walls).
type Factor = number | "wf" | "wf90";

type HotspotId = "bay" | "education" | "writing" | "projects" | "voice" | "photos" | "games";
const HREF: Record<HotspotId, string> = {
  bay: "#about",
  voice: "#about",
  games: "#about",
  education: "#about",
  projects: "#projects",
  photos: "#photos",
  writing: "#writing",
};

type Shape =
  | { t: "poly"; pts: string; fill: string; opacity?: string; stroke?: string }
  | { t: "line"; a: number[]; b: number[]; stroke: string }
  | { t: "circle"; c: number[]; r: number; fill: string }
  | { t: "glow"; c: number[] };
type Layer = { id: HotspotId | null; shapes: Shape[] };

const U = 15;
const C = Math.cos(Math.PI / 6) * U;
const S = 0.5 * U;
const P = (x: number, y: number, z: number) => [Math.round((x - y) * C), Math.round((x + y) * S - z * U)];

function hex(h: string, f: number) {
  const n = parseInt(h.slice(1), 16);
  return "#" + [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.min(255, Math.round(v * f)).toString(16).padStart(2, "0")).join("");
}

// Themed colours become CSS variables, one per colour and shade.
const themed = new Map<string, { key: ColorKey; f: Factor }>();
function tc(key: ColorKey, f: Factor = 1) {
  const name = `--sc-${key}-${String(f).replace(/\W/g, "_")}`;
  themed.set(name, { key, f });
  return `var(${name})`;
}
const factor = (T: Palette, f: Factor) => (f === "wf" ? T.wf : f === "wf90" ? T.wf * 0.9 : f);
const paletteVars = (T: Palette) =>
  [...themed].map(([name, { key, f }]) => `${name}:${hex(T[key], factor(T, f))}`).join(";") +
  `;--sc-lead:${T.lead};--sc-spill:${T.spill};--sc-glow:${T.glow ? 1 : 0}`;

// A colour is a hex string or a "$key" themed colour.
type Col = string;
const shade = (col: Col, f: Factor) => (col.startsWith("$") ? tc(col.slice(1) as ColorKey, f) : hex(col, f as number));

const layers: Layer[] = [];
let cur: Shape[] = [];
function group(id: HotspotId | null) {
  const layer: Layer = { id, shapes: [] };
  layers.push(layer);
  cur = layer.shapes;
}
const pts = (p: number[][]) => p.map((q) => q.join(",")).join(" ");
function poly(p: number[][], fill: string, extra: { opacity?: string; stroke?: string } = {}) {
  cur.push({ t: "poly", pts: pts(p), fill, ...extra });
}
function line(a: number[], b: number[], stroke: string) {
  cur.push({ t: "line", a, b, stroke });
}
function box(
  x: number, y: number, z: number, w: number, d: number, h: number, col: Col,
  o: { lf?: Factor; rf?: Factor; tf?: Factor } = {},
) {
  const top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const left = [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const right = [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)];
  poly(left, shade(col, o.lf ?? 0.8));
  poly(right, shade(col, o.rf ?? 0.6));
  poly(top, shade(col, o.tf ?? 1.0));
}

// room
group(null);
box(0, 0, -1, 16, 16, 1, "$floor");
for (let i = 1; i < 16; i++) {
  line(P(i, 0, 0), P(i, 16, 0), tc("grid"));
  line(P(0, i, 0), P(16, i, 0), tc("grid"));
}
box(-0.6, 0, 0, 0.6, 16, 11, "$wallR", { tf: 1.05, lf: "wf", rf: "wf90" });
box(0, -0.6, 0, 16, 0.6, 11, "$wallL", { tf: 1.05, lf: "wf", rf: "wf90" });

// window (the bay)
group("bay");
{
  const y0 = 3, y1 = 9, z0 = 4.5, z1 = 9.5;
  const frame = [P(0, y0, z0), P(0, y1, z0), P(0, y1, z1), P(0, y0, z1)];
  poly(frame, tc("sky"));
  cur.push({ t: "circle", c: P(0, 7.4, 8.4), r: 7, fill: tc("sun") });
  poly([P(0, 4.2, 4.5), P(0, 4.6, 4.5), P(0, 4.6, 7.6), P(0, 4.2, 7.6)], tc("bridge"));
  poly([P(0, 6.0, 4.5), P(0, 6.4, 4.5), P(0, 6.4, 7.4), P(0, 6.0, 7.4)], tc("bridge"));
  poly([P(0, 3, 5.3), P(0, 9, 5.3), P(0, 9, 5.5), P(0, 3, 5.5)], tc("bridge"));
  poly([P(0, 5.95, z0), P(0, 6.05, z0), P(0, 6.05, z1), P(0, 5.95, z1)], tc("mullion"));
  poly([P(0, y0, 7.0), P(0, y1, 7.0), P(0, y1, 7.08), P(0, y0, 7.08)], tc("mullion"));
  poly(frame, "none", { stroke: tc("frame") });
}

// diploma (education)
group("education");
{
  const x0 = 9.5, x1 = 12.5, z0 = 6.2, z1 = 8.4;
  poly([P(x0, 0, z0), P(x1, 0, z0), P(x1, 0, z1), P(x0, 0, z1)], "#3a2e1e");
  poly([P(x0 + 0.25, 0, z0 + 0.2), P(x1 - 0.25, 0, z0 + 0.2), P(x1 - 0.25, 0, z1 - 0.2), P(x0 + 0.25, 0, z1 - 0.2)], "#e8e0cc");
  poly([P(x0 + 0.6, 0, z0 + 1.4), P(x1 - 0.6, 0, z0 + 1.4), P(x1 - 0.6, 0, z0 + 1.5), P(x0 + 0.6, 0, z0 + 1.5)], "#8a7d66");
  poly([P(x0 + 0.8, 0, z0 + 1.0), P(x1 - 0.8, 0, z0 + 1.0), P(x1 - 0.8, 0, z0 + 1.08), P(x0 + 0.8, 0, z0 + 1.08)], "#8a7d66");
  poly([P(x0 + 1.0, 0, z0 + 0.55), P(x0 + 1.35, 0, z0 + 0.55), P(x0 + 1.35, 0, z0 + 0.9), P(x0 + 1.0, 0, z0 + 0.9)], "#b34a3a");
}

// shelf and books (writing)
group("writing");
box(3, 0, 7.2, 4.5, 1.2, 0.25, "#3b2f22");
{
  let bx = 3.3;
  for (const [c, w, h] of [["#b64a3f", 0.5, 1.9], ["#2e6b9a", 0.6, 2.1], ["#d9b24d", 0.45, 1.7], ["#5c8a5a", 0.55, 2.0], ["#8e5aa6", 0.5, 1.8]] as const) {
    box(bx, 0.15, 7.45, w, 0.9, h, c);
    bx += w + 0.08;
  }
}

// desk
group(null);
box(1.5, 1.5, 0, 13, 7, 0.5, "$desk");
box(2, 2.2, -1, 0.4, 0.4, 1, "#2b2b2b");
box(13.6, 2.2, -1, 0.4, 0.4, 1, "#2b2b2b");
box(2, 7.6, -1, 0.4, 0.4, 1, "#2b2b2b");
box(13.6, 7.6, -1, 0.4, 0.4, 1, "#2b2b2b");

// monitor (projects)
group("projects");
box(6.3, 3.2, 0.5, 1.2, 1.2, 0.25, "#3a3f46");
box(6.8, 3.7, 0.75, 0.3, 0.3, 1.2, "#3a3f46");
box(6.4, 0.9, 1.9, 0.35, 6.4, 4.1, "#2a2f36", { rf: 0.3 });
{
  const x = 6.75, y0 = 1.1, y1 = 7.1, z0 = 2.1, z1 = 5.8;
  poly([P(x, y0, z0), P(x, y1, z0), P(x, y1, z1), P(x, y0, z1)], "url(#scene-screen)");
  let z = z1 - 0.4;
  for (const [ind, len, c] of [[0.4, 0.2, "#f0b64a"], [0.3, 0.6, "#9fb3c8"], [0.5, 0.6, "#9fb3c8"], [0.3, 0.9, "#9fb3c8"], [0.4, 0.3, "#6fcf97"], [0.3, 0.7, "#9fb3c8"], [0.55, 0.4, "#9fb3c8"], [0.35, 0.55, "#9fb3c8"]] as const) {
    const a = y0 + 0.3 + ind, b = a + len * (y1 - y0 - 0.6);
    poly([P(x, a, z), P(x, b, z), P(x, b, z + 0.14), P(x, a, z + 0.14)], c, { opacity: ".9" });
    z -= 0.34;
  }
  poly([P(x, y0 + 0.3, z), P(x, y0 + 0.5, z), P(x, y0 + 0.5, z + 0.2), P(x, y0 + 0.3, z + 0.2)], "#f0b64a");
  const wy = y1 - 1.9;
  [0.2, 0.5, 0.9, 0.6, 1.1, 0.4, 0.8, 0.3, 0.6].forEach((v, i) => {
    const h = v * 0.45;
    poly([P(x, wy + i * 0.17, z0 + 0.9), P(x, wy + i * 0.17 + 0.1, z0 + 0.9), P(x, wy + i * 0.17 + 0.1, z0 + 0.9 + h), P(x, wy + i * 0.17, z0 + 0.9 + h)], "#6fcf97");
  });
}

// screen light on the desk (night only)
group(null);
poly([P(6.8, 1.2, 0.52), P(11.5, 0.8, 0.52), P(12.5, 8.2, 0.52), P(6.8, 7.4, 0.52)], "#9fb3c8", { opacity: "var(--sc-spill)" });

// phone (voice)
group("voice");
box(2.2, 7.5, 0.5, 1.3, 0.7, 0.1, "#1a1d22");
box(2.3, 7.58, 0.6, 1.1, 0.54, 0.02, "#0f2a3a");
[0.08, 0.16, 0.26, 0.18, 0.3, 0.12, 0.2].forEach((h, i) => box(2.42 + i * 0.13, 7.75, 0.62, 0.07, 0.2, h, "#6fcf97", { tf: 1.1 }));

// notebook, keyboard, mouse, mug
group(null);
box(9.6, 2.6, 0.5, 1.6, 4.4, 0.22, "#3a3f46");
for (let r = 0; r < 3; r++) for (let k = 0; k < 11; k++) box(9.8 + r * 0.48, 2.85 + k * 0.38, 0.72, 0.34, 0.28, 0.12, "#4a5058", { tf: 1.25 });
box(10.2, 7.6, 0.5, 0.9, 0.6, 0.28, "#4a5058", { tf: 1.2 });
box(12.6, 6.2, 0.5, 0.8, 0.8, 0.9, "#d7d2c6");
box(12.75, 6.35, 1.38, 0.5, 0.5, 0.03, "#3b2a1f");

// camera (photos)
group("photos");
box(7.6, 7.4, 0.5, 1.3, 0.9, 0.75, "#23272c");
box(7.95, 7.2, 0.9, 0.6, 0.25, 0.5, "#1a1d21", { tf: 0.9 });
box(8.1, 7.1, 1.0, 0.3, 0.12, 0.3, "#3b4147", { tf: 1.3 });
box(7.8, 7.5, 1.25, 0.4, 0.3, 0.1, "#4a5058");

// gamepad (games)
group("games");
box(12.0, 3.2, 0.5, 1.0, 1.9, 0.3, "#2f3942");
box(12.0, 3.1, 0.5, 0.5, 0.5, 0.45, "#2f3942");
box(12.0, 4.6, 0.5, 0.5, 0.5, 0.45, "#2f3942");
box(12.3, 3.45, 0.8, 0.25, 0.25, 0.12, "#d9b24d", { tf: 1.3 });
box(12.6, 3.45, 0.8, 0.25, 0.25, 0.12, "#4b86c8", { tf: 1.3 });
box(12.3, 4.7, 0.8, 0.25, 0.25, 0.12, "#c23b3b", { tf: 1.3 });
box(12.6, 4.7, 0.8, 0.25, 0.25, 0.12, "#6fcf97", { tf: 1.3 });

// lamp, its glow (night only), plant, chair
group(null);
box(13.1, 1.9, 0.5, 1.0, 1.0, 0.18, "#2b2b2b");
box(13.5, 2.3, 0.68, 0.2, 0.2, 3.4, "#2b2b2b");
box(12.6, 1.6, 3.9, 1.6, 1.6, 0.6, "#2b2b2b", { tf: 1.15 });
box(12.95, 1.95, 3.85, 0.9, 0.9, 0.05, "$bulb", { tf: 1.3 });
cur.push({ t: "glow", c: P(13.4, 2.4, 0.6) });
box(13.5, 12.5, 0, 1.4, 1.4, 1.3, "#b06a45");
for (const [lx, ly, lz, lw, ld, lh] of [[13.3, 12.6, 1.3, 0.9, 0.5, 0.4], [14.3, 12.9, 1.3, 0.8, 0.5, 0.35], [13.9, 12.2, 1.4, 0.6, 0.9, 0.5], [13.7, 12.9, 1.6, 0.7, 0.6, 0.5], [14.2, 12.4, 1.7, 0.5, 0.5, 0.8]]) box(lx, ly, lz, lw, ld, lh, "#3f8a52", { tf: 1.15 });
box(5.5, 10, 0.9, 3, 3, 0.5, "#2a3038");
box(5.5, 10, 0, 0.4, 0.4, 0.9, "#2b2b2b");
box(8.1, 10, 0, 0.4, 0.4, 0.9, "#2b2b2b");
box(5.5, 12.6, 0, 0.4, 0.4, 0.9, "#2b2b2b");
box(8.1, 12.6, 0, 0.4, 0.4, 0.9, "#2b2b2b");
box(5.5, 12.6, 1.4, 3, 0.4, 2.8, "#2a3038");

const LABELS: { id: HotspotId; at: number[]; y: number; text: string; anchor?: "start" }[] = [
  { id: "bay", at: P(0, 6, 9.6), y: -205, text: "the bay" },
  { id: "projects", at: P(6.75, 4.1, 5.9), y: -205, text: "projects" },
  { id: "education", at: P(11, 0, 8.5), y: -205, text: "education", anchor: "start" },
  { id: "writing", at: P(5.2, 0.3, 9.7), y: -205, text: "writing", anchor: "start" },
  { id: "voice", at: P(2.85, 7.85, 0.65), y: 258, text: "voice" },
  { id: "photos", at: P(8.25, 7.85, 1.3), y: 258, text: "photos" },
  { id: "games", at: P(12.5, 4.1, 0.9), y: 258, text: "games" },
];
const LABEL_TEXT = Object.fromEntries(LABELS.map((l) => [l.id, l.text])) as Record<HotspotId, string>;

const SCENE_CSS = `.scene{${paletteVars(THEMES.night)}}[data-theme="light"] .scene{${paletteVars(THEMES.day)}}`;

function renderShape(s: Shape, i: number) {
  switch (s.t) {
    case "poly":
      return (
        <polygon
          key={i}
          points={s.pts}
          shapeRendering="crispEdges"
          style={{ fill: s.fill, opacity: s.opacity, stroke: s.stroke, strokeWidth: s.stroke ? 2 : undefined }}
        />
      );
    case "line":
      return <line key={i} x1={s.a[0]} y1={s.a[1]} x2={s.b[0]} y2={s.b[1]} strokeWidth="1" style={{ stroke: s.stroke }} />;
    case "circle":
      return <circle key={i} cx={s.c[0]} cy={s.c[1]} r={s.r} style={{ fill: s.fill }} />;
    case "glow":
      return (
        <ellipse key={i} className="scene-glow" cx={s.c[0]} cy={s.c[1]} rx="105" ry="64" fill="url(#scene-glow)" style={{ opacity: "var(--sc-glow)" }} />
      );
  }
}

export function Scene() {
  const [active, setActive] = useState<HotspotId>("projects");
  const tiltRef = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);

  // Look around: the mouse tilts the room a little, dragging tilts it further and it springs back.
  useEffect(() => {
    const el = tiltRef.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let dragging = false, sx = 0, sy = 0;
    const clamp = (v: number) => Math.max(-1.6, Math.min(1.6, v));
    const tilt = (nx: number, ny: number) => {
      el.style.transform = `rotateX(${(-ny * 4).toFixed(2)}deg) rotateY(${(nx * 6).toFixed(2)}deg)`;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || dragging) return;
      const r = el.getBoundingClientRect();
      tilt(((e.clientX - r.left) / r.width - 0.5) * 1.2, ((e.clientY - r.top) / r.height - 0.5) * 1.2);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      e.preventDefault();
      dragging = true;
      dragged.current = false;
      sx = e.clientX;
      sy = e.clientY;
      el.style.transition = "none";
    };
    const onDrag = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) dragged.current = true;
      tilt(clamp(dx / 120), clamp(dy / 120));
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      el.style.transition = "";
      el.style.transform = "";
    };
    const onLeave = () => {
      if (!dragging) el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointermove", onDrag);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointermove", onDrag);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  // A drag that ends on an object is not a click.
  function onClickCapture(e: MouseEvent) {
    if (!dragged.current) return;
    dragged.current = false;
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div className="load-scene perspective-[1400px]">
      <style>{SCENE_CSS}</style>
      <div
        ref={tiltRef}
        className="scene aspect-[500/520] cursor-grab touch-pan-y select-none transition-transform duration-500 ease-curve transform-3d active:cursor-grabbing max-[900px]:aspect-[1/1.05]"
      >
        <svg
          viewBox="-250 -230 500 520"
          className="block size-full overflow-visible"
          role="group"
          aria-label="Mudit's desk at night or day. Each object links to a section."
          onClickCapture={onClickCapture}
        >
          <defs>
            <radialGradient id="scene-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#FEED65" stopOpacity=".5" />
              <stop offset=".5" stopColor="#FEED65" stopOpacity=".14" />
              <stop offset="1" stopColor="#FEED65" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="scene-screen" cx="30%" cy="20%" r="90%">
              <stop offset="0" stopColor="#1b2a3a" />
              <stop offset="1" stopColor="#0c131b" />
            </radialGradient>
          </defs>
          {layers.map((layer, li) =>
            layer.id ? (
              <a
                key={li}
                href={HREF[layer.id]}
                aria-label={`${LABEL_TEXT[layer.id]}, go to ${HREF[layer.id].slice(1)}`}
                onMouseEnter={() => setActive(layer.id!)}
                onFocus={() => setActive(layer.id!)}
                className={`cursor-pointer transition-[filter] duration-300 ease-curve ${active === layer.id ? "brightness-[1.35]" : ""}`}
              >
                {layer.shapes.map(renderShape)}
              </a>
            ) : (
              <g key={li}>{layer.shapes.map(renderShape)}</g>
            ),
          )}
          <g className="scene-labels pointer-events-none" aria-hidden="true">
            {LABELS.map((l) => {
              const on = active === l.id;
              const up = l.y < 0;
              const x = l.at[0];
              return (
                <g key={l.id}>
                  <line
                    x1={x}
                    y1={l.at[1]}
                    x2={x}
                    y2={up ? l.y + 8 : l.y - 16}
                    strokeDasharray="2 3"
                    className={`transition-[stroke] duration-300 ease-curve ${on ? "stroke-hi" : "stroke-(--sc-lead)"}`}
                  />
                  <circle
                    cx={x}
                    cy={l.at[1]}
                    r="2.5"
                    className={`transition-[fill] duration-300 ease-curve ${on ? "fill-hi" : "fill-[#aab3c0]"}`}
                  />
                  <text
                    x={l.anchor === "start" ? x + 8 : x}
                    y={l.y}
                    textAnchor={l.anchor ?? "middle"}
                    className={`font-mono text-[9.5px] transition-[fill] duration-300 ease-curve ${on ? "fill-hi" : "fill-muted"}`}
                  >
                    {l.text}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
