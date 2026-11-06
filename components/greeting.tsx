"use client";

import { useRef } from "react";

export function Greeting() {
  const hand = useRef<HTMLSpanElement>(null);

  // Wave again on hover by restarting the CSS animation, without the load delay.
  // Leaving does nothing, and a wave in progress is not interrupted.
  function wave() {
    const el = hand.current;
    if (!el || el.getAnimations().length) return;
    el.classList.remove("wave");
    void el.offsetWidth;
    el.style.animationDelay = "0s";
    el.classList.add("wave");
  }

  return (
    <h1 onMouseEnter={wave} className="heading-1 load-rise max-w-[680px]">
      {/* The gradient sits on the words only, so the emoji keeps its own colours. */}
      <span className="bg-linear-to-r from-(--h1a) to-(--h1b) bg-clip-text text-transparent">
        Sup, I&apos;m Mudit
      </span>{" "}
      <span ref={hand} aria-hidden="true" className="wave">
        👋
      </span>
    </h1>
  );
}
