"use client";

import { useEffect, useRef } from "react";

const TEXT = "I build voice agents, and the models that make them listen.";

// Words start dim and turn to ink one at a time as they cross 62% of the viewport.
export function Tagline() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const words = [...(ref.current?.querySelectorAll<HTMLElement>("[data-word]") ?? [])];
    let ticking = false;
    let left = words.length;
    function update() {
      ticking = false;
      const line = innerHeight * 0.62;
      for (const w of words) {
        if (w.dataset.on) continue;
        const r = w.getBoundingClientRect();
        if (r.top + r.height / 2 < line) {
          w.dataset.on = "1";
          left--;
        }
      }
      if (!left) removeEventListener("scroll", onScroll);
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section aria-label="Tagline" className="pt-24 max-[900px]:pt-20">
      <div className="wrap">
        <p ref={ref} className="heading-2 max-w-[680px]">
          {TEXT.split(" ").map((word, i) => (
            <span key={i}>
              <span
                data-word
                className="text-dim transition-colors duration-500 ease-curve data-on:text-ink motion-reduce:text-ink motion-reduce:transition-none"
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
