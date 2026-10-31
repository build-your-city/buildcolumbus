# Design direction

The Build Your City brand, as built for Build Columbus from the mockups in
October 2026. Every site under `sites/` shares it through the components and
tokens in `src/`; a new city is a copy of `sites/columbus/` with its own
config and photos, not a new design. Amend this deliberately rather than
drifting from it.

## Palette

| Token | Hex | Use |
|---|---|---|
| `ink` | `#141A2A` | Text, dark bands, footer, header button |
| `paper` | `#F4F1EA` | Page background |
| `blue` | `#3D8BFF` | Build Blue, the only accent: wordmark second line, eyebrows, link underlines, step numbers, date tags, focus rings |
| `blue-deep` | `#0063F7` | Build Blue darkened for contrast: primary button fills and hover text |
| `blue-hover` | `#0052CC` | Primary button hover fill |
| `ink-deep` | `#0B0F1A` | Footer background, with a 1px `rgba(255,255,255,0.08)` top border |
| `slate` | `#8E95A6` | Secondary text on ink |
| `line` | `#D9D4C7` | Borders and section dividers |
| `white` | `#FFFFFF` | Cards |

Build Blue is the single point of energy. At `#3D8BFF` it reads 3.3:1 on
white and 2.9:1 on Paper, so it stays on the wordmark, eyebrows at 14px and
up, and decorative elements. Wherever blue is a button background or running
text, use `blue-deep`, which passes WCAG AA (5.1:1 under white text, 4.5:1 as
text on Paper). Tokens live in `src/styles.css`.

## Typography

Google Fonts, one link tag: Inter Tight (700, 800) and Inter (500, 600).
Headings are mixed case with `letter-spacing: -0.025em` and `line-height: 1`.

| Role | Size | Font |
|---|---|---|
| Hero headline (home, parent) | 84px | Inter Tight 800 |
| Page title | 72px | Inter Tight 800 |
| Section heading | 56px | Inter Tight 800 |
| Card / step heading | 28px | Inter Tight 700 |
| Name / small heading | 22px | Inter Tight 700 |
| Wordmark | 34px in the header (28px on mobile), 40px in the footer | Inter Tight 800, uppercase, two lines; the second line is scaled so its width matches "BUILD" |
| Eyebrow / label | 14px | Inter 600, uppercase, 0.12em tracking, Build Blue |
| Lead paragraph (hero, dark bands) | 22px; 19px on dark bands at mobile widths | Inter 500 |
| Body | 17px | Inter 500, line-height 1.55 |
| Nav / button | 16px | Inter 600 |

Mobile drops the hero to 52px, page titles to 48px, and section headings to
40px.

## Layout

- Content is 1200px wide at most, with 48px side padding on desktop and 16px
  on mobile (`Container`).
- Sections have 88px vertical padding and a 1px Line border on top
  (`Section`). Content sections alternate Paper, White, Paper, White down
  the page, starting from the Paper hero; the one dark Ink band a page may
  have sits outside that alternation. The Sponsors and partners section is
  always Paper, so logos sit on Paper, and the alternation restarts after
  it. Cards and three-column boxes stay white whatever the section
  background.
- Hero: two equal columns, text left, photo right, 56px gap. Photos keep
  their natural aspect ratio and are never cropped. Two-column blocks
  alternate sides down the page (`SplitBlock`).
- Three-step and challenge-area sections are one white box with 1px Line
  border and 1px dividers between cells, no gaps (`ThreeUp`). Program cards
  on the home page and speaker cards are separate boxes with gaps.
- Cards are white with a 1px Line border, no shadow, no radius.
- Buttons: primary is `blue-deep` with white text and `blue-hover` on
  hover, never transparent. Secondary is transparent with a 2px Ink border
  and fills Ink with Paper text on hover; on a dark band it uses a Paper
  border and fills Paper with Ink text. 18px/28px padding, no radius
  (`CtaLink`).
- Sponsors and partners are a horizontal carousel, four logos visible on
  desktop, two under 768px, one under 480px, with 48px square arrow buttons
  (2px Ink border) that disable at either end. Logos sit on Paper with no
  box (`SponsorCarousel`).
- Footer: `ink-deep` background with a faint top border so it reads as its
  own element under a dark band; four columns (wordmark and tagline,
  Community, Connect, Contact).
- Mobile: single column, hero photo under the text, three-column boxes
  stack.

## Photography

Real community photos only, each used once. Where no photo exists yet, a
gray box labeled "PHOTO PLACEHOLDER" with a caption stands in
(`PhotoPlaceholder`), rendered with `aria-hidden`. Photos belong to the
site that uses them, under `sites/<city>/images/`.

## Quality floor

Works at 390px, visible keyboard focus on every interactive element, one
`h1` per page, Lighthouse accessibility 95 or better on every page.
