"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// The hero's photo: it tilts toward the cursor in 3D with a light sheen that follows the
// pointer, and springs back flat when the cursor leaves.

const MAX_TILT = 10;

export function PhotoCard() {
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = card.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.transition = "transform 0.15s linear";
        el.style.transform = `rotateX(${((0.5 - py) * MAX_TILT * 2).toFixed(2)}deg) rotateY(${((px - 0.5) * MAX_TILT * 2).toFixed(2)}deg) scale(1.02)`;
        el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        el.style.setProperty("--sheen", "1");
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transition = "";
      el.style.transform = "";
      el.style.setProperty("--sheen", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="load-visual flex justify-center perspective-[1000px]">
      <div
        ref={card}
        className="relative aspect-4/5 w-full max-w-[400px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] transition-transform duration-500 ease-curve transform-3d max-[900px]:max-w-[300px]"
      >
        <Image
          src="/img/pfp.webp"
          alt="Mudit standing in a vineyard"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 900px) 300px, 400px"
          className="object-cover"
        />
        {/* Light sheen that follows the pointer while the card is tilted. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-(--sheen,0) mix-blend-soft-light transition-opacity duration-300 ease-curve"
          style={{
            background: "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,.55), transparent 45%)",
          }}
        />
      </div>
    </div>
  );
}
