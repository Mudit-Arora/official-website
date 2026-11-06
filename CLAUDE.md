# muditarora.vercel.app — rebuild

Personal site for Mudit Arora, member of technical staff at Synhawk (synhawk.com: models that detect cloned voices and deepfake video), in the Bay Area, working on voice. The goal of the rebuild: **an about-me site, not a résumé.** The previous site (Create React App, now in `legacy/react-site/`) is being replaced entirely.

This file carries the decisions made in a design session on 2026-11-05. Read it fully before touching code, then open `design/prototype/index.html` in a browser: that file *is* the approved design. Port it; do not redesign it.

## What is approved

A hybrid of three directions:

- **Hero visual: a photo card** (replaced the isometric desk on 2026-11-05 at Mudit's request; the desk code is in git history, `components/scene.tsx` before that date). `components/photo-card.tsx`: his photo from the old site (`public/img/pfp.webp`, the vineyard shot) in a portrait card that tilts toward the cursor (up to 10°) with a light sheen (Mudit removed the "now at Synhawk" pill). No tilt on touch or with reduced motion. The nav is the only site navigation.
- **Instrument Serif** for all headings and prose; **Geist Mono** for labels, timestamps, nav, buttons. Two families, nothing else.
- **Project rows, not cards.** Name, one plain line, award or venue on the right, tilted screenshot preview on hover.
- Sections, in order: hero, about (prose + one fact), projects. Photos (`/photos`) and Writing (`/writing`) are their own pages. An interactive isometric desk section (three.js, spin/move/toggle) was built and then removed at Mudit's request on 2026-11-06; it is in git history if wanted again.
- **Two themes that change the time of day.** Night: lamp on, moon, screen light spill, copy says "my desk at 2am". Day: sun in the window, light walls, lamp off, "my desk at 2pm". Sun/moon toggle in the nav; follows system preference by default; remembers a manual choice in localStorage; no flash on load.

Reference screenshots: `design/mockups/` (`themes-side-by-side.png`, `light-full-page.png`, `dark-full-page.png`, `themes-mobile.png`, `interaction.gif` shows the load sequence, hover, drag and the tagline reveal).

## Stack

- Next.js (App Router, TypeScript), Tailwind v4, deployed on Vercel. The app lives at the repo root.
- `legacy/` holds the old sites (`coming-soon/`, `react-site/`). Keep them in the repo, never deploy or delete them. Exclude `legacy/` from `tsconfig.json`, ESLint, and Tailwind source detection (`@source not "../legacy";` or equivalent).
- Fonts via `next/font/local` from `app/fonts/` (copied from `design/prototype/fonts/`; do not use Google Fonts).
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

## Headings

- `SectionHeading` (`components/section-label.tsx`): mono index in nav order (01 About, 02 Projects, 03 Photos, 04 Writing), title in the serif with the hero gradient, optional true note on the right ("12 projects", "4 albums"). heading-2 for homepage sections, heading-1 (`page`) for the Photos and Writing pages.

## Type and spacing

Named text styles, sizes on the Tailwind scale (from the `landing-page-design` skill). Instrument Serif has one weight, so weight rules do not apply.
- heading-1 60/60 (hero) · heading-2 48/48 (tagline, footer line) · heading-4 30/36 (about prose) · heading-5 24/32 (row titles, post titles)
- title-1 20/28 (hero sub, photo line) · title-2 18/28 (row descriptions) · body-3 16/24 (facts)
- caption-4 12/16 mono medium (section labels, nav) · caption-5 12/16 mono (meta) · button-sm 14/20 mono semibold
- mobile (≤900px): heading-1 48/48, heading-2 36/40, heading-4 24/32

Spacing only from: 0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96. Radius only Tailwind values (8px on buttons and previews, 9999 on pills). Content width 1200px, 40px side padding (20px on mobile); lists capped at 820px; hero heading and sub capped at 680px.

## Motion

- Cursor: a themed system cursor via CSS (`public/cursors/`): a rounded arrow in `--hi` colours (yellow with a dark edge at night, azure with a white edge by day) and a matching pointing hand over links, buttons, project rows and album folders. Mudit chose this over a dot or a trailing ring: no lag, no JavaScript.

- Background (`components/background.tsx`): a fixed canvas dot grid behind every page. Dots near the mouse glow in `--hi`; at night about 5% of dots twinkle like stars and a shooting star streaks across every 3 to 8 seconds; by day two clouds made of bigger, darker dots drift across. 30fps, paused when hidden, static with reduced motion. Body has no background so the canvas shows.

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
- No email anywhere on the site (Mudit removed the email CTA from the nav, hero and footer on 2026-11-05; the mockups predate this). Do not add it back unless he asks.

## Content (all from the old site and Mudit's Instagram, confirmed by him)

- Headline (h1): "Sup, I'm Mudit 👋". The old headline "I build voice agents. The rest of the time, I am here." was removed by Mudit on 2026-11-05: he is not only into voice AI, so do not frame the site as voice only. No sub line (removed by Mudit on 2026-11-05; Synhawk is mentioned in About instead). The hand waves on load and hover. Below the sub: "Full Time Developer | Part Time Gamer | All Time Learner" (his wording and casing).
- No proof line in the hero (removed by Mudit on 2026-11-05). Wins appear only as project labels.
- About (rewritten by Mudit, 2026-11-05; copy edited only for grammar): lead line "I'm a member of technical staff at Synhawk, based in the Bay Area, where we build foundation models that detect deepfakes across audio, video and identity." Then past roles with titles (AI engineer EzMedTech AI, deep learning researcher Uniphore, AI software engineering intern CRED, machine learning researcher Mayo Clinic), interests (NLP, LLMs, generative AI), and off the clock (photos, cafes and restaurants, games, sitcoms).
- Under About: a "Studied" subheading (serif, hero gradient) and two rows styled like the project list: MS in Artificial Intelligence, UC Santa Cruz; BS in Computer Science, Arizona State University. Each row has the school's logo on a white tile (`public/logos/`, public domain from Wikimedia Commons: UCSC seal, ASU monogram cropped from the ASU logo). Mudit removed "Won" and "Elsewhere" on 2026-11-05. Links: GitHub `Mudit-Arora`, LinkedIn `aroramudit`, X `xxmuditaroraxx`, Instagram `xmuditarorax`, resume PDF at `/MuditAroraResume.pdf`.
- Current role (from Mudit, 2026-11-05): member of technical staff at Synhawk. Synhawk's description comes from synhawk.com; his specific work there is not confirmed, so do not describe it beyond the company's own words. Work history lives in the About paragraph only and in the resume. No work section, no skills section.
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
  Plus ParkPal, Photo Share and Socially Unsocial (added 2026-11-05). All twelve now live in `content/projects.ts` with a description, tech list and links (GitHub, website, Devpost, demo video, report) taken from the old site (`legacy/react-site/src/App.js`). Rows show link icons on the right; the cursor following preview card shows the screenshot, description and tech. No GitHub link beside the Projects label (removed by Mudit).
- Hero shows social icons (GitHub, LinkedIn, X, Instagram, resume) under the roles line, as on the old site (minus email).
- Photos: no intro line for now (Mudit removed "Mostly places, mostly at night…" on 2026-11-05 and will add something else). Lives on `/photos`: just the album folders (Mudit: "only folders are enough"; no per album grids). Shown as photo albums (folders, after a design by damien for Lovable, added 2026-11-05): albums from `content/photos.ts`: Bay Area, Chicago, Dubai, Phoenix, New York, Hong Kong, Delhi (his list, 2026-11-05; Mumbai removed). Photos lift on hover; click fans them out and the front turns solid; Escape or clicking elsewhere closes. The prototype's strip used **stand-in frames** (`ph/1-5.webp` are not his). Mudit will supply 6 to 8 of his own; `profile-pic.webp` is his. Link: instagram.com/xmuditarorax.
- Writing (`/writing`): nothing published yet. The page shows "Coming soon!" (Mudit's wording) on a blue glyph card (`components/glyph-card.tsx`, after "glyphblue" by sucodeee: drifting mono glyphs on a canvas that clear around the cursor) until `content/posts.ts` has a post; the prototype's placeholder draft titles were removed.

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

- Where the glyph card goes once posts exist (it only shows while `content/posts.ts` is empty). Suggested: a featured card for the latest post at the top of `/writing`. Decide when the first post is added.
- His 6 to 8 photos, and the first real post title.
- Project years/dates if he wants them shown instead of the award labels.
