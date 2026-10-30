# CLAUDE.md

Guidance for AI coding agents (Claude Code, Copilot, Cursor, etc.) working in
this repository.

## What this is

The Build Your City websites. The repo root is a shared library; each site
is a sibling folder under `sites/`:

- `sites/columbus/` — buildcolumbus.org, a Columbus, Ohio community of
  builders serving local nonprofits. Programs are Meetup, Serve, and Hack.
  Formerly Christians in Tech; the Meetup group slug is still `citcbus`.
- `sites/build-your-city/` — build-your-city.org, the parent site. A single
  page listing the cities.
- `src/` — the shared package both sites import from: components, brand
  tokens, and the Meetup event data and helpers.

A new city is a copy of `sites/columbus/` with its own `config/city.ts` and
photos. It is intentionally maintained as a community learning project —
clarity beats cleverness.

## Commands

- `npm run dev` (alias `dev:columbus`) — Columbus dev server on port 3000
- `npm run dev:byc` — Build Your City dev server on port 3001
- `npm run build` — typecheck, then build both sites into `dist/<site>/`
- `npm run build:columbus` / `npm run build:byc` — one site
- `npm run check` — Biome lint + format check (run before committing)
- `npx tsc --noEmit` — typecheck
- `npm test` — Vitest

## Architecture

- **Shared package (`src/`):** `src/components/` are config-agnostic and take
  everything site-specific as props (Header, Footer, EventCard). Sites import
  them with the `@/` alias, which every site's `vite.config.ts` and the root
  `tsconfig.json` point at `src/`. Brand tokens live in `src/styles.css`;
  each site's `styles.css` imports it and declares `@source` paths.
- **City site (`sites/columbus/`):** TanStack Router, file-based. Every file
  in `routes/` is a page. `routes/__root.tsx` is the shared layout (Header +
  Outlet + Footer) and is where the city config is turned into nav and
  footer props — page content never goes in the root route.
- **`sites/columbus/routeTree.gen.ts` is generated.** Never edit it by hand;
  the Vite plugin regenerates it when routes change.
- **City config:** everything city-specific (name, links, venue, sponsors,
  organizers) lives in `sites/columbus/config/city.ts`. Hack recap content is
  in `sites/columbus/data/hack2026.ts`.
- **Event data:** `src/data/events.json` is written by
  `scripts/sync-events.mjs` via a nightly GitHub Action — don't hand-edit it
  except to hotfix. `src/lib/events.ts` reads it and parses the meetup number
  out of the synced title.
- **Deploys:** the root `netlify.toml` builds Columbus. The Build Your City
  Netlify project uses `sites/build-your-city/netlify.toml` via its base
  directory setting. See README.md.
- **Styling:** Tailwind v4 utilities. No inline `style` objects, no CSS
  modules. Shared CTA styling lives in `src/components/CtaLink.tsx` — use it
  instead of styling raw anchors. Build Blue is the only accent color;
  `blue-deep` is its contrast-safe variant for button fills and hover text.

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
- The old `/events` route redirects to `/meetup` via
  `sites/columbus/public/_redirects`.
- LinkedIn links for Hack speakers and the "Get notified for 2027" target are
  placeholders until organizers supply URLs.
