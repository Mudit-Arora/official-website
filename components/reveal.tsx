"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

// A section that rises 32px and fades in once as it enters the viewport (see .reveal in
// globals.css). The shown state lives in React, so server and client HTML always match.
export function Reveal({ className = "", ...props }: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <section ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} {...props} />;
}
