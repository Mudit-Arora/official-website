"use client";

import { useEffect } from "react";

// An arcade coin on every press of something clickable (the same things that get the
// pointing hand cursor). The sound is "Arcade game jump coin" from Mixkit (free licence),
// in public/sounds/. Played through Web Audio so it starts instantly and can overlap.
// Anything inside [data-sound="paper"] (photos paging in an open album) makes a paper
// slide instead, and components can ask for a sound with playSound().

const CLICKABLE = 'a, button, [role="button"], [data-row], [data-album], label, summary';
const VOLUME = { click: 0.1, paper: 0.1 };
const SOUNDS = { click: "/sounds/click.m4a", paper: "/sounds/paper.m4a" };
type Sound = keyof typeof SOUNDS;

export function playSound(name: Sound) {
  dispatchEvent(new CustomEvent<Sound>("play-sound", { detail: name }));
}

const soundFor = (el: Element): Sound => (el.closest('[data-sound="paper"]') ? "paper" : "click");

export function ClickSound() {
  useEffect(() => {
    // The context starts suspended until the first press, as browsers require.
    const ctx = new AudioContext();
    const buffers: Partial<Record<Sound, AudioBuffer>> = {};
    for (const [name, url] of Object.entries(SOUNDS) as [Sound, string][]) {
      fetch(url)
        .then((r) => r.arrayBuffer())
        .then((b) => ctx.decodeAudioData(b))
        .then((b) => (buffers[name] = b))
        .catch(() => {});
    }

    function play(name: Sound) {
      if (ctx.state === "suspended") ctx.resume();
      const buffer = buffers[name];
      if (!buffer) return;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.value = VOLUME[name];
      src.connect(gain).connect(ctx.destination);
      src.start();
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const el = (e.target as Element | null)?.closest?.(CLICKABLE);
      if (el) play(soundFor(e.target as Element));
    };
    // Keyboard presses on buttons and links count too.
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !e.repeat && (e.target as Element | null)?.closest?.(CLICKABLE)) {
        play("click");
      }
    };
    const onPlay = (e: Event) => play((e as CustomEvent<Sound>).detail);

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    addEventListener("play-sound", onPlay);
    return () => {
      removeEventListener("play-sound", onPlay);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      ctx.close();
    };
  }, []);

  return null;
}
