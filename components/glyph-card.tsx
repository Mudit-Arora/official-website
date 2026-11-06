"use client";

import { useEffect, useRef, type ReactNode } from "react";

// A blue card filled with drifting mono glyphs that clear away around the cursor.
// After "glyphblue" by sucodeee. Drawn on a canvas; it only animates while on screen.

const CELL_W = 10;
const CELL_H = 15;
const FONT = 11;
// Sparse to dense.
const SYMBOLS = ". : ; = + * ? % $ #".split(" ");
const LETTERS = "MUDITARORA";
// Glyphs appear above this field value; just above it, letters trace the edges of each blob.
const THRESHOLD = 0.5;
const EDGE = 0.025;
const CURSOR_RADIUS = 110;

export function GlyphCard({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mono = getComputedStyle(el).getPropertyValue("--font-geist-mono") || "monospace";

    let w = 0, h = 0, raf = 0, visible = false, t = Math.random() * 100;
    // The cursor's clearing circle eases in and out, and trails a little behind the pointer.
    const cursor = { x: -999, y: -999, tx: -999, ty: -999, r: 0, tr: 0 };

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = el!.clientWidth;
      h = el!.clientHeight;
      cv!.width = w * dpr;
      cv!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.font = `500 ${FONT}px ${mono}, monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
    }

    // Smooth, slowly moving blobs from a few overlapping waves.
    function field(x: number, y: number) {
      const v =
        Math.sin(x * 0.021 + t * 0.35) +
        Math.sin(y * 0.034 - t * 0.27) +
        Math.sin((x - y) * 0.016 + t * 0.19) +
        Math.sin(Math.hypot(x - w * 0.6, y - h * 0.4) * 0.024 - t * 0.42);
      return (v + 4) / 8;
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      cursor.x += (cursor.tx - cursor.x) * 0.15;
      cursor.y += (cursor.ty - cursor.y) * 0.15;
      cursor.r += (cursor.tr - cursor.r) * 0.1;
      for (let y = CELL_H / 2; y < h; y += CELL_H) {
        for (let x = CELL_W / 2; x < w; x += CELL_W) {
          let n = field(x, y);
          if (cursor.r > 1) {
            const d = Math.hypot(x - cursor.x, y - cursor.y);
            if (d < cursor.r) n -= (1 - d / cursor.r) ** 1.5 * 0.6;
          }
          if (n < THRESHOLD) continue;
          const k = (n - THRESHOLD) / (1 - THRESHOLD);
          let ch: string;
          if (n < THRESHOLD + EDGE) {
            // A fixed, scattered letter per cell, so edges read as noise rather than words.
            const hash = (Math.floor(x / CELL_W) * 73856093) ^ (Math.floor(y / CELL_H) * 19349663);
            ch = LETTERS[(hash >>> 0) % LETTERS.length];
          } else {
            ch = SYMBOLS[Math.min(SYMBOLS.length - 1, Math.floor(k * SYMBOLS.length * 1.4))];
          }
          ctx!.fillStyle = `rgba(255,255,255,${(0.35 + k * 0.6).toFixed(2)})`;
          ctx!.fillText(ch, x, y);
        }
      }
    }

    function loop() {
      t += 0.016;
      draw();
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    }
    function start() {
      if (!still && !raf) raf = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      cursor.tx = e.clientX - r.left;
      cursor.ty = e.clientY - r.top;
      if (cursor.r < 1) {
        cursor.x = cursor.tx;
        cursor.y = cursor.ty;
      }
      cursor.tr = CURSOR_RADIUS;
    };
    const onLeave = () => (cursor.tr = 0);
    const onVisibility = () => !document.hidden && visible && start();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(el);
    if (!still) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrap} className="relative overflow-hidden rounded-xl bg-[#0046de] text-white">
      <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 size-full" />
      <div className="relative">{children}</div>
    </div>
  );
}
