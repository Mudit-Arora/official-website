# muditarora.vercel.app — rebuild

Personal site for Mudit Arora, AI engineer in the Bay Area working on voice. The goal of the rebuild: **an about-me site, not a résumé.** The previous site (Create React App, now in `legacy/react-site/`) is being replaced entirely.

This file carries the decisions made in a design session on 2026-11-05. Read it fully before touching code, then open `design/prototype/index.html` in a browser: that file *is* the approved design. Port it; do not redesign it.

## What is approved

A hybrid of three directions:

- **The desk.** The hero is an isometric room (drawn live in SVG, from boxes) of Mudit's desk. Objects are hotspots: monitor → projects, books → writing, camera → photos, phone → voice, gamepad → games, window → the Bay, diploma → education. Hover lights the object and its label; click scrolls to the section. Mouse movement tilts the room a few degrees; dragging tilts it further and it springs back on release.
- **Instrument Serif** for all headings and prose; **Geist Mono** for labels, timestamps, nav, buttons. Two families, nothing else.
- **Project rows, not cards.** Name, one plain line, award or venue on the right, tilted screenshot preview on hover.
- Sections, in order: hero, about (prose + three facts), projects, tagline reveal, photos, writing, footer with the one CTA.
- **Two themes that change the time of day.** Night: lamp on, moon, screen light spill, copy says "my desk at 2am". Day: sun in the window, light walls, lamp off, "my desk at 2pm". Sun/moon toggle in the nav; follows system preference by default; remembers a manual choice in localStorage; no flash on load.

Reference screenshots: `design/mockups/` (`themes-side-by-side.png`, `light-full-page.png`, `dark-full-page.png`, `themes-mobile.png`, `interaction.gif` shows the load sequence, hover, drag and the tagline reveal).

## Stack

- Next.js (App Router, TypeScript), Tailwind v4, deployed on Vercel. The app lives at the repo root.
- `legacy/` holds the old sites (`coming-soon/`, `react-site/`). Keep them in the repo, never deploy or delete them. Exclude `legacy/` from `tsconfig.json`, ESLint, and Tailwind source detection (`@source not "../legacy";` or equivalent).
- Fonts via `next/font/local` from `design/prototype/fonts/` (do not use Google Fonts).
- Writing as MDX pages under `app/writing/<slug>/`; a new post is a new file.
- Photos in `public/photos/`, listed in one data file.
- Scene: one client component that ports the vanilla JS in the prototype (box projection, hover, click, tilt, day/night palettes). Motion (Framer Motion) is fine for the tilt spring; plain CSS is fine for everything else.

## Palette (from a structure borrowed from @pierredelcourr: deep tinted dark, one saturated accent, one pastel highlight)

Night (default when the system is dark)
- ground `#010511` Midnight Black · surface `#0A1020` · surface-2 `#111833` · line `#1B2238`
- ink `#F2F1EC` · text `#C5C8D3` · muted `#8A90A3` · dim `#5B6176`
- accent `#0046DE` Deep Azure (buttons, links, focus) with `#FFFFFF` on it
- highlight `#FEED65` Baby Yellow (lamp glow, hovered labels, selection)
- hero heading gradient `#FFFFFF → #9B9B9B` left to right (text only; never gradients on backgrounds)

Day
- ground `#F4F6FB` · surface `#FFFFFF` · surface-2 `#E9EDF7` · line `#DCE1EE`
- ink `#010511` · text `#2B3047` · muted `#5E6478` · dim `#9AA0B4`
- accent `#0046DE` · highlight for hovered labels becomes `#0046DE` (yellow fails contrast on white); `#FEED65` stays for the sun and text selection
- hero heading gradient `#010511 → #6B7088`

Scene palettes for night and day are in the prototype as `THEMES.night` and `THEMES.day`.

## Type and spacing

Named text styles, sizes on the Tailwind scale (from the `landing-page-design` skill). Instrument Serif has one weight, so weight rules do not apply.
- heading-1 60/60 (hero) · heading-2 48/48 (tagline, footer line) · heading-4 30/36 (about prose) · heading-5 24/32 (row titles, post titles)
- title-1 20/28 (hero sub, photo line) · title-2 18/28 (row descriptions) · body-3 16/24 (facts)
- caption-4 12/16 mono medium (section labels, nav) · caption-5 12/16 mono (meta) · button-sm 14/20 mono semibold
- mobile (≤900px): heading-1 48/48, heading-2 36/40, heading-4 24/32

Spacing only from: 0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96. Radius only Tailwind values (8px on buttons and previews, 9999 on pills). Content width 1200px, 40px side padding (20px on mobile); lists capped at 820px; hero heading and sub capped at 680px.

## Motion

- Easing everywhere: `cubic-bezier(.22,1,.36,1)`. Hovers 300ms, layout moves 500ms, never under 200ms. Animate only `transform` and `opacity`.
- Page load, once: headline lines rise (0 / 80ms), sub and actions follow, the room fades up at 300ms, the lamp "switches on" at 900ms, labels fade in at 1300ms.
- Sections rise 32px and fade in once on scroll (IntersectionObserver, never an unthrottled scroll listener). No replay.
- Tagline section: words start at the dim color and turn to ink one at a time as they cross 62% of the viewport (rAF-throttled scroll).
- `prefers-reduced-motion`: everything static, full color, no tilt.
- Buttons: lift 1px on hover, `scale(.98)` on press. Rows and photos: color shift and a 1.03 image zoom only. No tilt cards, no carousels, no parallax, nothing else moves on scroll.

## Copy rules

- Sentence case everywhere. Plain words. No "revolutionize", "effortless", "world class" and friends.
- No hyphens inside copy ("runner up", "multi agent", "decoder only"). `text-wrap: balance` on headings, `pretty` on prose, so no single word sits alone on a line.
- **Never invent facts.** Dates, wins, employers and project claims come from Mudit. Anything unknown is a visible placeholder like `{{photo 3}}`, not a plausible guess. There is no "replies within a day" type line anywhere.
- One primary action on the whole site: email `muditarora31@gmail.com`. It appears in the nav pill, the hero and the footer, and nowhere else.

## Content (all from the old site and Mudit's Instagram, confirmed by him)

- Headline: "I build voice agents. The rest of the time, I am here." Sub: "AI engineer in the Bay Area, working on agents that listen and talk back. This is my desk at 2am, more or less." (2pm in day mode)
- Proof line beside the CTA: "Winner, CruzHacks 2025 and runner up at the smallest.ai hackathon"
- About, two paragraphs, as in the prototype. "sf ~ phx ~ del" is from his Instagram bio (places lived, in order).
- Facts: MS in AI, UC Santa Cruz; BS in CS, Arizona State. Wins as above. Links: GitHub `Mudit-Arora`, LinkedIn `aroramudit`, X `xxmuditaroraxx`, Instagram `xmuditarorax`, resume PDF at `/MuditAroraResume.pdf`.
- Work history lives in the About sentence only ("Lately at EzMedTech AI, Uniphore and CRED; before that, machine learning at Mayo Clinic") and in the resume. No work section, no skills section.
- Projects (name · line · right label · link · image in `design/prototype/img/`):
  Blindspot · describes the world to blind users, from an iPhone · runner up, smallest.ai · github.com/Mudit-Arora/Blindspot · blindspot.webp
  SlugMeditate · a thought, turned into a VR world · winner, CruzHacks 2025 · slugmeditate.tech · slugmeditate.webp
  EduVoice AI · talk to your lecture notes, in any language · YC hackathon · github.com/yooleee/Vibecon-Education-Platform · eduvoice.webp
  EduMUSE · a multi agent tutor that talks you through your notes · 2025 · github.com/iamsorenl/EduMUSE · EduMUSE.webp
  AmICooked.Chat · a Chrome extension that grades your focus · HackDavis 2025 · devpost.com/software/amicooked-chat · amicookedchat.webp
  Emotion detection · LSTM and BiLSTM across languages · SemEval 2025 · github.com/Mudit-Arora/semeval-task11 · emotion-detection.webp
  Language modelling · a decoder only transformer, from scratch · PyTorch · /NLP_243_Homework_3.pdf · language-model.webp
  Brainrot Roast Bot · roasts you, replies in GIFs · Dumbathon · github.com/Dumb-team-Dumbathon/current-build · brainrot.webp
  Mood Snap · BeReal, for feelings · CalHacks 10 · devpost.com/software/mood-app · moodsnap.webp
  Also on GitHub, not in the list: ParkPal, Photo Share, Socially Unsocial. "all twelve on GitHub" links to github.com/Mudit-Arora.
- Photos: "Mostly places, mostly at night. Chicago, Mumbai, Dubai, Portland, and a lot of the Bay." The strip in the prototype uses **stand-in frames** (`ph/1-5.webp` are not his). Mudit will supply 6 to 8 of his own; `profile-pic.webp` is his. Link: instagram.com/xmuditarorax.
- Writing: nothing published yet. The three draft titles in the prototype are placeholders Mudit will replace. Show drafts with a "draft" tag so the section looks finished before the first post exists.

## Skills installed for this project (`npx skills add …`)

- `emilkowalski/skill` — animation taste; `review-animations` and `improve-animations` for any motion code.
- `Leonxlnx/taste-skill` (`design-taste-frontend`) — anti-generic layout rules, equal edges, one section per screen, real icons.
- `elayadesign/ai-design-skills` (`landing-page-design`) — type scale, spacing, radius, motion curve, scroll reveals, tagline section.
When they conflict, the approved prototype wins, then Mudit's explicit choices (serif font, the Pierre palette), then `landing-page-design`.

## Deployment

- Vercel project `muditarora` currently has Root Directory `my-website`, which no longer exists on the `rebuild` branch. At merge time: set Root Directory to empty (repo root) and Framework to Next.js, then merge `rebuild` into `main`.
- GitHub Pages is disabled (it was failing every push looking for `/docs`). Do not re-enable it.

## Build plan

1. Scaffold at the repo root (repo already restructured: old sites are in `legacy/`, design in `design/`). Copy the PDFs from `legacy/react-site/public/` into `public/` (copy, do not move).
2. Port `design/prototype/index.html` section by section: nav, hero + scene, about, projects, tagline, photos, writing, footer. Match the mockups before changing anything.
3. Theme: inline script in `<head>` sets `data-theme` from localStorage or `prefers-color-scheme` before paint.
4. Ship items: `<title>`, description, og image, favicon (existing `favicon.ico`), skip link, focus rings, alt text, a custom 404, `/privacy` stub, no dead links.
5. Verify: `next build` clean; screenshots at 1440 and 390 in both themes; no horizontal overflow at 390; Lighthouse accessibility ≥ 95.

## Still open with Mudit

- His 6 to 8 photos, and the first real post title.
- Project years/dates if he wants them shown instead of the award labels.
