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
| `blue` | `#3D8BFF` | Build Blue, the only accent: wordmark second line, link underlines, step numbers, focus rings, and small text on navy |
| `blue-text` | `#0056D6` | Build Blue for small text (under 18px) on White and Paper: uppercase labels, the event weekday, link hover text |
| `blue-deep` | `#0063F7` | Build Blue darkened for button fills |
| `blue-hover` | `#0052CC` | Primary button hover fill |
| `ink-deep` | `#0B0F1A` | Header and footer background, each with a 1px `rgba(255,255,255,0.08)` border on the page side |
| `slate` | `#8E95A6` | Secondary text on ink |
| `line` | `#D9D4C7` | Borders and section dividers |
| `white` | `#FFFFFF` | Cards |

Build Blue is the single point of energy. At `#3D8BFF` it reads 3.3:1 on
White and 2.9:1 on Paper, which is too low for small text, so on light
backgrounds it stays on the wordmark, large text (18px and up, like the 56px
step numbers), and decorative elements such as link underlines and focus
rings. Choose the blue by text size and background:

| Text | On White or Paper | On navy (Ink, `ink-deep`) |
|---|---|---|
| Small (under 18px) | `blue-text`: 6.4:1 on White, 5.6:1 on Paper | `blue`: 5.2:1 on Ink, 5.8:1 on `ink-deep` |
| Large (18px and up) | `blue` | `blue` |

`blue-text` would fail on navy (2.7:1), which is why small text there keeps
Build Blue. Buttons use `blue-deep` under white text (5.1:1). All three are
the same hue. Tokens live in `src/styles.css`.

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
| Label | 14px | Inter 600, uppercase, 0.12em tracking, `blue-text` on White and Paper |
| Lead paragraph (hero, dark bands) | 22px; 19px on dark bands at mobile widths | Inter 500 |
| Body | 17px | Inter 500, line-height 1.55 |
| Nav / button | 16px | Inter 600 |

Mobile (under 640px) uses a smaller scale: hero 52px with line-height 0.95,
page titles 44px, section headings 36px, card headings 24px, lead
paragraphs 18px, body 17px with line-height 1.5. The shared strings live in
`src/components/text.ts`.

## Layout

- Content is 1200px wide at most, with 48px side padding on desktop and 20px
  on mobile (`Container`).
- Sections have 72px vertical padding (48px on mobile) and a 1px Line border
  on top (`Section`). The hero has no border and a shorter bottom. Content
  sections alternate White and Paper down the page, starting from the White
  hero. The alternation is automatic (`section[data-band]` in
  `src/styles.css`), so adding or removing a section never puts two
  same-colored bands together. The one dark Ink call-to-action band a page
  may have sits outside that alternation. Cards and three-column boxes stay
  white with a 1px Line border whatever the section background.
- Section headings over a centered or symmetric group (cards, steps, logos)
  are centered, with any intro line held to a narrower width
  (`SectionHeading align="center"`). Call-to-action bands center the whole
  block in one narrow column (`Section align="center"`). Heroes and photo
  blocks stay left-aligned.
- **Responsive rule: size by the space available, not the screen.** Phones
  held sideways (667 to 932px wide, 360 to 430px tall) and tablets fall
  between the phone and desktop layouts, so:
  - Grids of separate cards use
    `grid-cols-[repeat(auto-fit,minmax(min(100%,<min>),1fr))]`, left-aligned,
    wrapping onto as many rows as needed, with `<min>` the narrowest a card
    can be: program cards 17rem, speaker cards 17rem, organizer cards 16rem.
    Phones get one column and desktop the same count as before. In between,
    speaker and organizer cards are two per row from about 560px wide.
  - Alignment: headings over a group of cards are centered; headings over
    paragraphs are left-aligned, and so are their paragraphs; call-to-action
    bands are centered. Inside cards, short-line content (photo, label,
    name, title, links) is centered while the cards are stacked or two per
    row, and left-aligned only where the layout is roomy. Speaker cards are
    centered until they are three across (a 55rem container: 3 x 17rem plus
    two 32px gaps), then left-aligned. Organizer cards are centered with the
    photo above the name while the card is narrow, and put the photo beside
    the name, left-aligned, once the card has room (22rem inside its
    padding).
  - Long one-word link labels (bare domains) break between words, never
    mid-word: give the link `labelParts` (for example
    `["riverview", "international", "center.org"]`), which render joined
    with `<wbr>`.
  - Joined boxes and side-by-side layouts switch on their own width with a
    container query (`@container` on a wrapper, then `@3xl:`, `@4xl:`,
    `@5xl:`), never on a screen breakpoint like `md:`.
  - No fixed heights on cards or text boxes; use `min-h-*` so content can
    grow.
  - Short screens (under 500px tall) have a `short:` variant in
    `src/styles.css`. Use it to keep things from filling the screen: stacked
    photos cap at 70% of the screen height, the header and mobile menu
    tighten, and the Build Your City headline shrinks. Full-height layouts
    use `min-h-dvh`, not `min-h-screen`.
  - Check every change at 390x844 and 1280 wide, plus 667x375, 740x360,
    844x390, 932x430, 768x1024, and 820x1180.
- Hero and other two-column blocks: 45% text and 55% photo, 56px gap, once
  the block is at least 56rem wide (desktop). The photo is 4:3, full width of
  its column, `object-fit: cover`, and vertically centered against the
  text. Narrower, the photo goes under the text, shaped by `stackedPhoto`:
  `"strip"` (heroes, the default) is a 16:10 crop, capped at 70% of the
  screen height on short screens; `"full"` (content photos that must not be
  cropped, like the Hack recap) is the whole 4:3 photo with no cap, framed
  toward the top. Each photo may set a focal point (`object-position`,
  default `50% 50%`) so a crop keeps the right part in view. Blocks
  alternate sides down the page (`SplitBlock`).
- Three-step and challenge-area sections are one white box with 1px Line
  border and 1px dividers between cells, no gaps, once there is room (48rem
  for three steps, 64rem for five areas); narrower, they are separate cards
  (`ThreeUp`). Program cards on the home page and speaker cards are separate
  boxes with gaps.
- Cards are white with a 1px Line border, no shadow, no radius.
- Buttons: primary is `blue-deep` with white text and `blue-hover` on
  hover, never transparent. Secondary is transparent with a 2px Ink border
  and fills Ink with Paper text on hover; on a dark band it uses a Paper
  border and fills Paper with Ink text. 18px/28px padding, no radius
  (`CtaLink`).
- Sponsors and partners are a grid of equal white cards, 1px Line border,
  32px side padding, at least 120px tall, logo centered. Two per row, with
  logos growing with the cards from 56px to 80px tall, then four per row at
  56px once the row is 56rem wide or more (no three-per-row step); 16px gap.
  A partial last row sits centered. The whole card is the link
  (`SponsorGrid`).
- Header: `ink-deep` background with a faint bottom border. Wordmark first
  line Paper, second line Build Blue. Nav links are Paper, hover Build Blue,
  and the active page is underlined in Build Blue. The header button is a
  primary button. The mobile menu panel shares the dark background.
- Footer: `ink-deep` background with a faint top border so it reads as its
  own element under a dark band; four columns (wordmark and tagline,
  Community, Connect, Contact) when it is 64rem wide or more, two by two
  from 36rem, stacked below that.
- Mobile (under 640px): everything left-aligned, including the dark bands and
  anything centered on desktop. Buttons are full width and stack with a 12px
  gap, with text links under them. Three-column boxes, program cards,
  challenge areas, and speaker cards stack as single-column cards with a 16px
  gap, each keeping its border. Photos go under the text at 16:10, cover.
  The event card puts the date block on top. The footer stacks its columns
  32px apart. The header shows the wordmark at 28px and a menu button; the
  panel is full width with 48px tap targets. No paragraph runs past four
  lines on a 390px screen; a long one is split at a sentence boundary. No
  horizontal scroll at 360px.
- Parent site (build-your-city.org): a single Ink screen, no header bar or
  footer component. Wordmark and email on top, a 112px headline with two
  paragraphs and one button in the middle, and the city list along the
  bottom. On phones it scrolls naturally with the same mobile rules.

## Photography

Real community photos only; a photo may appear on more than one page.
Where no photo exists yet, a
gray box labeled "PHOTO PLACEHOLDER" with a caption stands in
(`PhotoPlaceholder`), rendered with `aria-hidden`. Photos belong to the
site that uses them, under `sites/<city>/images/`.

## Quality floor

Works at 390px, visible keyboard focus on every interactive element, one
`h1` per page, Lighthouse accessibility 95 or better on every page.
