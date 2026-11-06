"use client";

import { useEffect } from "react";

// An arcade coin on every press of something clickable (the same things that get the
// pointing hand cursor). The sound is "Arcade game jump coin" from Mixkit (free licence),
// in public/sounds/. Played through Web Audio so it starts instantly and can overlap.

const CLICKABLE = 'a, button, [role="button"], [data-row], [data-album], label, summary';
const VOLUME = 0.35;

export function ClickSound() {
  useEffect(() => {
    // The context starts suspended until the first press, as browsers require.
    const ctx = new AudioContext();
    let sound: AudioBuffer | null = null;
    fetch("/sounds/click.m4a")
      .then((r) => r.arrayBuffer())
      .then((b) => ctx.decodeAudioData(b))
      .then((b) => (sound = b))
      .catch(() => {});

    function tick() {
      if (ctx.state === "suspended") ctx.resume();
      if (!sound) return;
      const src = ctx.createBufferSource();
      src.buffer = sound;
      const gain = ctx.createGain();
      gain.gain.value = VOLUME;
      src.connect(gain).connect(ctx.destination);
      src.start();
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if ((e.target as Element | null)?.closest?.(CLICKABLE)) tick();
    };
    // Keyboard presses on buttons and links count too.
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !e.repeat && (e.target as Element | null)?.closest?.(CLICKABLE)) tick();
    };

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      ctx.close();
    };
  }, []);

  return null;
}
