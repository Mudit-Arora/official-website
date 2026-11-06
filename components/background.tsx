"use client";

import { useEffect, useRef } from "react";

// The page background: a faint dot grid. Dots near the cursor light up in the highlight
// colour. At night a few dots twinkle like stars and a shooting star crosses every few
// seconds; by day, clouds made of bigger dots drift across.
// One fixed canvas, drawn at about 30fps, paused while the tab is hidden.

const GAP = 28;
const DOT = 1.5;
const GLOW_RADIUS = 180;
const FRAME_MS = 1000 / 30;

// Day clouds: where each starts (fraction of the width), its height (fraction of the
// viewport), speed in px per second, and size.
const CLOUDS = [
  { x0: 0.15, y: 0.24, speed: 14, scale: 1.7 },
  { x0: 0.65, y: 0.68, speed: 9, scale: 1.25 },
];
// A cloud is a few overlapping puffs: offset x, offset y, radius.
const PUFFS = [
  [-95, 12, 70],
  [-35, -22, 88],
  [40, -6, 78],
  [105, 16, 60],
  [10, 32, 72],
];
const CLOUD_REACH = 360;

type Rgb = [number, number, number];
type Meteor = { x: number; y: number; vx: number; vy: number; age: number; life: number };

function rgb(value: string): Rgb {
  const hex = value.trim().replace("#", "");
  const n = parseInt(hex.length === 3 ? hex.replace(/./g, "$&$&") : hex, 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
}

// A stable pseudo random number per grid cell.
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const root = document.documentElement;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0, last = 0, t = 0;
    let meteors: Meteor[] = [];
    let nextMeteor = 2 + Math.random() * 3;
    const mouse = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };
    let colors = read();

    function read() {
      const cs = getComputedStyle(root);
      return {
        dot: rgb(cs.getPropertyValue("--dim")),
        glow: rgb(cs.getPropertyValue("--hi")),
        star: rgb(cs.getPropertyValue("--ink")),
        night: root.dataset.theme !== "light",
      };
    }

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      cv!.width = w * dpr;
      cv!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // How much of a cloud covers this point, 0 to 1.
    function cloudAt(x: number, y: number) {
      let k = 0;
      for (const c of CLOUDS) {
        const span = w + CLOUD_REACH * 2;
        const cx = ((c.x0 * span + t * c.speed) % span) - CLOUD_REACH;
        const cy = c.y * h;
        if (Math.abs(x - cx) > CLOUD_REACH * c.scale || Math.abs(y - cy) > CLOUD_REACH * c.scale) continue;
        for (const [dx, dy, pr] of PUFFS) {
          const r = pr * c.scale;
          const d = Math.hypot(x - (cx + dx * c.scale), y - (cy + dy * c.scale));
          if (d < r) k = Math.max(k, 1 - d / r);
        }
      }
      return k;
    }

    // Night: a shooting star every few seconds, a short diagonal streak with a fading tail.
    function drawMeteors(dt: number, color: Rgb) {
      if (t > nextMeteor) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const angle = ((25 + Math.random() * 15) * Math.PI) / 180;
        const speed = 700 + Math.random() * 300;
        meteors.push({
          x: dir > 0 ? Math.random() * w * 0.6 : w * (0.4 + Math.random() * 0.6),
          y: Math.random() * h * 0.4,
          vx: dir * Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          age: 0,
          life: 0.7 + Math.random() * 0.4,
        });
        nextMeteor = t + 3 + Math.random() * 5;
      }
      meteors = meteors.filter((m) => (m.age += dt) < m.life);
      for (const m of meteors) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        const fade = Math.sin((Math.PI * m.age) / m.life);
        const len = 190 * fade;
        const v = Math.hypot(m.vx, m.vy);
        const tx = m.x - (m.vx / v) * len;
        const ty = m.y - (m.vy / v) * len;
        const tail = ctx!.createLinearGradient(tx, ty, m.x, m.y);
        tail.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},0)`);
        tail.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},${(0.95 * fade).toFixed(3)})`);
        ctx!.strokeStyle = tail;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(m.x, m.y);
        ctx!.stroke();
        ctx!.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${fade.toFixed(3)})`;
        ctx!.fillRect(m.x - 1.5, m.y - 1.5, 3, 3);
      }
    }

    function draw(dt = 0) {
      const { dot, glow, star, night } = colors;
      ctx!.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.2;
      mouse.y += (mouse.ty - mouse.y) * 0.2;
      for (let iy = 0, y = GAP / 2; y < h; iy++, y += GAP) {
        for (let ix = 0, x = GAP / 2; x < w; ix++, x += GAP) {
          const r = hash(ix, iy);
          let alpha = night ? 0.28 : 0.4;
          let color = dot;
          let size = DOT;

          if (night && r < 0.05) {
            // Stars: a few dots twinkle at their own pace.
            const tw = (Math.sin(t * (0.6 + r * 14) + r * 90) + 1) / 2;
            color = star;
            alpha = 0.15 + tw * 0.55;
            size = DOT + tw * 0.8;
          } else if (!night && !still) {
            // Day: dots under a cloud grow and darken.
            const k = cloudAt(x, y);
            if (k > 0) {
              color = star;
              alpha = 0.12 + k * 0.3;
              size = DOT + k * 2.2;
            }
          }

          const d = Math.hypot(x - mouse.x, y - mouse.y);
          if (d < GLOW_RADIUS) {
            const k = (1 - d / GLOW_RADIUS) ** 2;
            ctx!.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
            ctx!.fillRect(x - size / 2, y - size / 2, size, size);
            color = glow;
            alpha = k * 0.9;
            size = DOT + k * 1.5;
          }

          ctx!.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
          ctx!.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      if (night && !still) drawMeteors(dt, star);
      else meteors = [];
    }

    function loop(now: number) {
      raf = document.hidden ? 0 : requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      // Capped, so returning to the tab does not jump everything forward.
      const dt = Math.min(now - last, 100) / 1000;
      t += dt;
      last = now;
      draw(dt);
    }
    function start() {
      if (still) return draw();
      if (!raf) raf = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (mouse.tx < -1e3) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    const onLeave = () => {
      mouse.tx = mouse.ty = -1e4;
      mouse.x = mouse.y = -1e4;
    };
    const onResize = () => {
      resize();
      draw();
    };
    const onVisibility = () => !document.hidden && start();
    // Re-read colours when the theme changes.
    const mo = new MutationObserver(() => {
      colors = read();
      draw();
    });

    resize();
    start();
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    addEventListener("resize", onResize);
    if (!still) {
      addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      removeEventListener("resize", onResize);
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 size-full" />;
}
