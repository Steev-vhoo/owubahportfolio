# Owubah — Creative Portfolio

Portfolio site for Francisca Nana Owubah, built with React, Vite and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
```

## Edit content

All copy (bio, journey, projects, services, clients, contact) is in `src/data.js`.
Images are in `public/img/`. Colors are CSS variables at the top of `src/styles.css`.

## Deploy to Vercel

Import the GitHub repo in Vercel. It detects Vite automatically
(build: `npm run build`, output: `dist`), and `vercel.json` pins those settings.

## Animations

- Intro “curtain call”: a gold tiara draws itself in, then the curtain lifts
- Hero: masked title reveal, rotating golden halo, drifting petals, twinkling stars, crown and spinning pageant badge
- About: a satin sash unfurls across the Ghana’s Most Beautiful portrait
- Gold shimmer text, a glitter cursor trail on desktop, 3D tilt and sparkle on project cards, an animated journey timeline and a clients marquee
- All motion respects the visitor’s “reduce motion” setting
