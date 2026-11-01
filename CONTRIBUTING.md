# Contributing to Build Columbus

Thanks for helping build buildcolumbus.org and build-your-city.org. This
project exists partly *so that* people can learn by contributing. Questions
are welcome, and no contribution is too small.

## The short version

1. **Find or open an issue.** Check the
   [issue list](https://github.com/build-your-city/buildcolumbus/issues).
   Issues labeled `good first issue` are scoped for newcomers. If you want
   to work on something that isn't filed yet, open an issue first so we can
   talk it through.
2. **Comment on the issue** to claim it so two people don't do the same
   work.
3. **Fork or branch.** Branch from `main` using a descriptive name:
   `fix/mobile-menu-focus`, `feat/hack-schedule`, `chore/sponsor-logos`.
4. **Make your change.** Run `npm run check` and `npm run build` locally
   before pushing.
5. **Open a pull request.** Fill in the PR template. CI will lint,
   typecheck, test, and build your branch, and Netlify will post a deploy
   preview link so reviewers can click around your change.
6. **Review.** A maintainer reviews, may request changes, and merges.
   Merges to `main` deploy to production automatically.

## Using AI tools (encouraged!)

Part of the mission of this repo is teaching AI-assisted development
workflows. Using Claude Code, Copilot, Cursor, or similar tools is not just
allowed, it's encouraged. Two rules:

- **You own what you submit.** Read and understand the code your tools
  produce. "The AI wrote it" is not a review response.
- **Keep changes scoped to the issue.** Agents love refactoring things they
  weren't asked to touch. Diffs should match the issue they close.

The repo includes a [CLAUDE.md](CLAUDE.md) with project conventions that
coding agents pick up automatically.

## Code conventions

- TypeScript everywhere; no `any` unless there's a comment explaining why.
- Tailwind utility classes for styling; avoid inline `style` objects.
- Formatting and lint rules are enforced by Biome (`npm run check`); don't
  fight the formatter.
- Columbus pages live in `sites/columbus/routes/` (file-based routing).
  Shared UI goes in `src/components/`. City-specific content (links,
  sponsors, organizers) lives in `sites/columbus/config/city.ts` so
  non-experts can edit it via PR.
- External links: `target="_blank"` always pairs with
  `rel="noopener noreferrer"`.
- Accessibility is a requirement, not a nice-to-have: semantic headings
  (one `h1` per page), alt text on images, keyboard-reachable interactions.
- New third-party scripts, embeds, or forms must be added to the
  Content-Security-Policy in both `netlify.toml` files, or they will be
  blocked in production.

## Questions?

Ask in the Build Columbus Discord or bring it to a meetup. This project is
meant to be worked on together, in person, too.
