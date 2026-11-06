"use client";

import { useEffect, useRef } from "react";

// The hero banner: a slow, drifting noise field in azure and yellow, cut into a few
// colour bands and dithered with a fixed grain (after a dithered background in the
// "Premium AI Backgrounds" Figma file). The field leans away from the cursor a little.
// Drawn small and scaled up without smoothing, at about 20fps, paused off screen.

const GRAIN = 3; // css px per grain pixel
const BLOCK = 3; // grain pixels per field sample, which gives the stepped edges
const FRAME_MS = 1000 / 20;

// Colour bands from low to high: deep azure, periwinkle, lime, baby yellow.
const BANDS = {
  night: [
    [0, 70, 222],
    [111, 134, 240],
    [200, 234, 90],
    [254, 237, 101],
  ],
  day: [
    [0, 70, 222],
    [140, 160, 245],
    [214, 240, 130],
    [254, 237, 101],
  ],
};

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

// Smooth value noise.
function noise(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number) {
  return 0.55 * noise(x, y) + 0.3 * noise(x * 2.1 + 5.2, y * 2.1 + 1.3) + 0.15 * noise(x * 4.3 + 9.1, y * 4.3 + 7.7);
}

export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const root = document.documentElement;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0, last = 0, t = 0, visible = true;
    let img: ImageData | null = null;
    let grain = new Float32Array(0);
    const mouse = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5 };

    function size() {
      const r = cv!.getBoundingClientRect();
      w = Math.max(1, Math.ceil(r.width / GRAIN));
      h = Math.max(1, Math.ceil(r.height / GRAIN));
      cv!.width = w;
      cv!.height = h;
      img = ctx!.createImageData(w, h);
      // A fixed threshold per grain pixel, so the grain stays put while the field moves.
      grain = new Float32Array(w * h);
      for (let i = 0; i < grain.length; i++) grain[i] = (hash(i % w, Math.floor(i / w)) - 0.5) * 0.34;
    }

    function draw() {
      if (!img) return;
      const bands = root.dataset.theme === "light" ? BANDS.day : BANDS.night;
      const data = img.data;
      const scale = 1 / 55; // field features span about 55 grain pixels
      const bw = Math.ceil(w / BLOCK) + 1, bh = Math.ceil(h / BLOCK) + 1;
      const field = new Float32Array(bw * bh);
      const mx = mouse.x * w, my = mouse.y * h;
      const stacked = w * GRAIN <= 900; // the hero's one column layout
      for (let by = 0; by < bh; by++) {
        for (let bx = 0; bx < bw; bx++) {
          const px = bx * BLOCK, py = by * BLOCK;
          // Push the field gently away from the cursor.
          const dx = px - mx, dy = py - my;
          const push = 18 * Math.exp(-(dx * dx + dy * dy) / 9000);
          const len = Math.hypot(dx, dy) || 1;
          const x = (px + (dx / len) * push) * scale, y = (py + (dy / len) * push) * scale;
          // Domain warp, so the shapes fold like the reference instead of drifting as blobs.
          const wx = fbm(x + t * 0.05, y - t * 0.03);
          const wy = fbm(x - t * 0.04 + 3.7, y + t * 0.05 + 8.1);
          field[by * bw + bx] = fbm(x + 1.6 * wx, y + 1.6 * wy);
        }
      }
      for (let y = 0; y < h; y++) {
        const row = Math.floor(y / BLOCK) * bw;
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          // The field sits mostly in 0.3 to 0.7; stretch it so all four bands show, and
          // lean it toward azure behind the text so the yellow gathers around the photo
          // (beside the text on wide screens, below it on narrow ones).
          const lean = (stacked ? y / h - 0.55 : x / w - 0.6) * 0.9;
          const v = (field[row + Math.floor(x / BLOCK)] - 0.3) * 1.8 + lean + grain[i];
          const band = bands[v < 0.22 ? 0 : v < 0.42 ? 1 : v < 0.6 ? 2 : 3];
          data[i * 4] = band[0];
          data[i * 4 + 1] = band[1];
          data[i * 4 + 2] = band[2];
          data[i * 4 + 3] = 255;
        }
      }
      ctx!.putImageData(img, 0, 0);
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (now - last < FRAME_MS) return;
      t += Math.min(now - last, 100) / 1000;
      last = now;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      draw();
    }

    function start() {
      cancelAnimationFrame(raf);
      if (still) return draw();
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      start();
    });
    const ro = new ResizeObserver(() => {
      size();
      draw();
    });
    // Redraw when the theme flips, even when paused.
    const mo = new MutationObserver(draw);

    size();
    draw();
    io.observe(cv);
    ro.observe(cv);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    document.addEventListener("visibilitychange", start);
    if (!still) window.addEventListener("pointermove", onMove, { passive: true });
    start();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="hero-field load-visual absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={ref} className="size-full [image-rendering:pixelated]" />
    </div>
  );
}
