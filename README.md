# Build Your City websites

The websites for [Build Columbus](https://buildcolumbus.org/) and its parent,
[Build Your City](https://build-your-city.org/). Build Columbus is a
Columbus, Ohio community of developers, designers, content creators, and
other builders who serve local nonprofits through three programs: **Meetup**
(monthly at Improving), **Serve** (volunteering with Columbus nonprofits),
and **Hack** (one day a year with global partner Indigitous). It is the first
city in Build Your City.

This is a **community project**, built and maintained by members as a
real-world codebase for learning modern web development and AI-assisted
workflows. If you've never contributed to open source before, this is a good
place to start. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Layout

The repo root is a shared library. Each site is a sibling folder under
`sites/` that imports from it.

```
src/                     # shared package, imported by every site as "@/..."
  components/            # Header, Footer, Section, ThreeUp, SponsorGrid, ...
  styles.css             # brand tokens (Ink, Paper, Build Blue, ...) and base styles
  lib/events.ts          # upcoming-event helpers; parses the meetup number from the title
  data/events.json       # written nightly by the Meetup sync
sites/
  columbus/              # buildcolumbus.org
    routes/              # one file per page (TanStack Router); __root.tsx is the layout
    config/city.ts       # everything city-specific: links, venue, sponsors, organizers
    data/hack2026.ts     # #HACK Columbus recap content
    images/              # photos, sponsor logos, speaker headshots
    public/              # favicon, manifest, _redirects
    vite.config.ts
  build-your-city/       # build-your-city.org, a single page
    App.tsx, config.ts, vite.config.ts, netlify.toml
scripts/
  sync-events.mjs        # fetches upcoming events from the public Meetup page
.github/workflows/
  ci.yml                 # lint, typecheck, test, build on every PR
  sync-events.yml        # nightly event sync (commits src/data/events.json)
netlify.toml             # deploy config for the Columbus project
```

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for build tooling, one config per site
- [TanStack Router](https://tanstack.com/router) for the city sites
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Biome](https://biomejs.dev/) for linting and formatting
- [Vitest](https://vitest.dev/) for tests
- Deployed on [Netlify](https://www.netlify.com/), one project per site

## Getting started

```bash
git clone https://github.com/build-your-city/buildcolumbus.git
cd buildcolumbus
npm install
npm run dev            # Columbus on http://localhost:3000
npm run dev:byc        # Build Your City on http://localhost:3001
```

Other commands:

```bash
npm run check          # lint + format check (Biome)
npx tsc --noEmit       # typecheck
npm test               # run tests
npm run build          # typecheck, then build both sites into dist/<site>/
npm run build:columbus # one site
npm run build:byc
```

## Adding a city

A new city is a copy of `sites/columbus/` with its own `config/city.ts` and
photos. Then add a `dev:<city>` / `build:<city>` script pair in
`package.json`, list the city in `sites/build-your-city/config.ts`, and
create a Netlify project for it (see below).

## Deploying

Each site is its own Netlify project on this repo.

**Columbus** (the existing project) uses the root `netlify.toml`: build
command `npm run build:columbus`, publish directory `dist/columbus`.

**Build Your City** needs one setting in the Netlify UI: set **Base
directory** to `sites/build-your-city`. Netlify then reads
`sites/build-your-city/netlify.toml`, which installs at the repo root and
runs `npm run build:byc`, publishing `dist/build-your-city`. Leave the build
command and publish directory fields in the UI empty so the file wins.

## How event data works

Meetup no longer offers open iCal/RSS feeds, so a scheduled GitHub Action
(`sync-events.yml`) parses our public [Meetup page](https://www.meetup.com/citcbus/events/)
nightly and commits the results to `src/data/events.json`. The sites are
fully static. If Meetup is unreachable or changes its markup, the sites keep
serving the last known-good data and the workflow fails loudly instead of
writing garbage. The Columbus home page and `/meetup` read from that file,
as does the city card on Build Your City, and the meetup number ("Build
Columbus Meetup #48") comes from the event title.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), then look for issues labeled
[`good first issue`](https://github.com/build-your-city/buildcolumbus/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).
We especially welcome contributions from members learning AI-assisted
development. This repo includes a [CLAUDE.md](CLAUDE.md) so coding agents
(Claude Code, Copilot, Cursor) can work productively here.

## License

[MIT](LICENSE)
