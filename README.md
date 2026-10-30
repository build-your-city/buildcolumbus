# buildcolumbus.org

The website for [Build Columbus](https://buildcolumbus.org/), a Columbus,
Ohio community of developers, designers, content creators, and other
builders who serve local nonprofits. Three programs: **Meetup** (monthly at
Improving), **Serve** (volunteering with Columbus nonprofits), and **Hack**
(one day a year with global partner Indigitous). Build Columbus is the first
city in [Build Your City](https://build-your-city.org/).

This site is a **community project**, built and maintained by members as a
real-world codebase for learning modern web development and AI-assisted
workflows. If you've never contributed to open source before, this is a good
place to start. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for build tooling
- [TanStack Router](https://tanstack.com/router) (file-based routes in `src/routes/`)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Biome](https://biomejs.dev/) for linting and formatting
- [Vitest](https://vitest.dev/) for tests
- Deployed on [Netlify](https://www.netlify.com/)

## Getting started

```bash
git clone https://github.com/citorg/main-website.git
cd main-website
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run check      # lint + format check (Biome)
npx tsc --noEmit   # typecheck
npm test           # run tests
npm run build      # production build
npm run dev:byc    # parent site, build-your-city.org, on http://localhost:3001
npm run build:byc  # parent site production build into dist-byc/
```

## Project structure

```
src/
  routes/          # one file per page (TanStack Router file-based routing)
    __root.tsx     # shared layout: Header + <Outlet /> + Footer
    index.tsx      # home
    meetup.tsx     # Meetup: next meetup, how a meetup goes, call for talks
    serve.tsx      # Serve: volunteering with Columbus nonprofits
    hack.tsx       # Hack: #HACK Columbus recap, challenge areas, speakers
    about.tsx      # About: organizers, sponsors, Build Your City
  components/      # shared components (Section, ThreeUp, SponsorCarousel, ...)
  config/city.ts   # everything city-specific: links, venue, sponsors, organizers
  data/            # committed data (events.json from Meetup, hack2026.ts)
  lib/events.ts    # upcoming-event helpers; parses the meetup number from the title
  images/          # photos, sponsor logos, speaker headshots
sites/
  build-your-city/ # the parent site, a single page reusing src/components
scripts/
  sync-events.mjs  # fetches upcoming events from our public Meetup page
.github/workflows/
  ci.yml           # lint, typecheck, test, build on every PR
  sync-events.yml  # nightly event sync (commits src/data/events.json)
```

## Another city

Everything specific to Columbus lives in `src/config/city.ts`. Standing up a
new city is a copy of that file plus that city's photos and logos.

## How event data works

Meetup no longer offers open iCal/RSS feeds, so a scheduled GitHub Action
(`sync-events.yml`) parses our public [Meetup page](https://www.meetup.com/citcbus/events/)
nightly and commits the results to `src/data/events.json`. The site itself is
fully static. If Meetup is unreachable or changes its markup, the site keeps
serving the last known-good data and the workflow fails loudly instead of
writing garbage. The home page and `/meetup` read from that file, and the
meetup number ("Build Columbus Meetup #48") comes from the event title.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), then look for issues labeled
[`good first issue`](https://github.com/citorg/main-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).
We especially welcome contributions from members learning AI-assisted
development. This repo includes a [CLAUDE.md](CLAUDE.md) so coding agents
(Claude Code, Copilot, Cursor) can work productively here.

## License

[MIT](LICENSE)
