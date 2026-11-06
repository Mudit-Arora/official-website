"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function useTheme(): Theme {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    () => "dark",
  );
}

function savedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

export function ThemeToggle() {
  const theme = useTheme();

  // Follow the system until there is a manual choice.
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (savedTheme() || new URLSearchParams(location.search).get("theme")) return;
      document.documentElement.dataset.theme = mq.matches ? "light" : "dark";
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Both icons are rendered and swapped in CSS, so the right one shows before hydration.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to night" : "Switch to day"}
      className="grid size-7 cursor-pointer place-items-center rounded-full border border-line text-muted transition-[color,rotate] duration-300 ease-curve hover:rotate-15 hover:text-ink"
    >
      <svg
        className="size-3.5 day:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        className="hidden size-3.5 day:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
