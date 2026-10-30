# CLAUDE.md

Guidance for AI coding agents (Claude Code, Copilot, Cursor, etc.) working in
this repository.

## What this is

The website for Build Columbus (buildcolumbus.org), a Columbus, Ohio community
of builders serving local nonprofits. Programs are Meetup, Serve, and Hack.
Formerly Christians in Tech; the Meetup group slug is still `citcbus`. It is
intentionally maintained as a community learning project — clarity beats
cleverness.

The parent site, build-your-city.org, lives in `sites/build-your-city/` as a
separate single-page app that reuses the same components.

## Commands

- `npm run dev` — dev server on port 3000
- `npm run check` — Biome lint + format check (run before committing)
- `npx tsc --noEmit` — typecheck
- `npm test` — Vitest
- `npm run build` — typecheck + production build
- `npm run dev:byc` / `npm run build:byc` — the parent site on port 3001,
  built into `dist-byc/`

## Architecture

- **Routing:** TanStack Router, file-based. Every file in `src/routes/` is a
  page. `src/routes/__root.tsx` is the shared layout (Header + Outlet +
  Footer) — page content never goes in the root route.
- **`src/routeTree.gen.ts` is generated.** Never edit it by hand; the Vite
  plugin regenerates it when routes change.
- **City config:** everything city-specific (name, links, venue, sponsors,
  organizers) lives in `src/config/city.ts`. Another city is a copy of that
  file plus photos.
- **Data as JSON:** events (`src/data/events.json`) and projects
  (`src/data/projects.json`) are committed JSON imported directly into
  components. `events.json` is written by `scripts/sync-events.mjs` via a
  nightly GitHub Action — don't hand-edit events except to hotfix.
  `src/lib/events.ts` parses the meetup number out of the synced title;
  `src/data/hack2026.ts` holds the Hack recap content.
- **Styling:** Tailwind v4 utilities with brand tokens in `src/styles.css`.
  No inline `style` objects, no CSS modules. Shared CTA styling lives in
  `src/components/CtaLink.tsx` — use it instead of styling raw anchors. Build
  Blue is the only accent color.

## Conventions

- One `h1` per page; sections use `h2`/`h3`.
- External links always get `rel="noopener noreferrer"` with
  `target="_blank"`.
- Internal navigation uses TanStack Router `<Link>`, never `<a href>`.
- Biome enforces tabs and double quotes — run `npm run check` rather than
  guessing.
- Keep diffs scoped to the issue being worked on. Do not refactor unrelated
  code in the same PR.

## Content rules

- Programs are Meetup, Serve, Hack. Never "Hackathon" except in the formal
  event name "#HACK Columbus 2026".
- No scripture, no prayer, "content creator" not "writer", no "Serve days",
  no "ongoing projects". Serve opportunities are shared on Discord and at the
  meetup, not on Meetup.com.
- "Build Your City" is always written as a proper name.
- Gray "PHOTO PLACEHOLDER" boxes are deliberate; swap in a real photo when
  one is supplied. Never reuse a photo in two places.

## Gotchas

- Devtools render only when `import.meta.env.DEV` is true — keep it that way.
- The old `/events` route redirects to `/meetup` via `public/_redirects`.
- LinkedIn links for Hack speakers and the "Get notified for 2027" target are
  placeholders until organizers supply URLs.
