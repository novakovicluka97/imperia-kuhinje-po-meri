# Imperia Design System

**Imperia — kuhinje po meri** (Imperia — bespoke kitchens).

Imperia designs, builds, and installs hand-crafted custom kitchens. The brand sits in the *premium / bespoke* tier of the kitchen category: cabinetry as joinery, not flat-pack; rooms designed once, kept for decades. Buyers are typically homeowners renovating or building a primary residence; designers / architects spec'ing for a client; and developers fitting out higher-end residential units.

This design system gives any design tool — Claude, a human designer, a contractor — the foundations to produce on-brand artefacts for Imperia: marketing pages, brochures, presentations, social posts, signage, proposal documents.

## Sources & references

- **Aesthetic reference:** the user pointed to `https://www.smallbone.co.uk/` as a tonal target for the *category* (luxury, English-bespoke kitchen-makers). This system takes inspiration from the broad conventions of that category — refined serifs, dark + bone palette, large architectural photography, generous whitespace — without reproducing any third-party brand's logo, copy, or imagery. All marks and copy in this system are original to Imperia.
- **Brand name:** "Imperia — kuhinje po meri" (Croatian; "kuhinje po meri" = bespoke / made-to-measure kitchens).
- **Brand assets received:** none at time of writing. Logos, photography, swatches, and material samples should be supplied by the user; placeholders are in `assets/` and image-slot drop zones are wired into the UI kit.

## Index

| File | What it is |
|---|---|
| `README.md` | This file — brand context, content & visual foundations, iconography |
| `SKILL.md` | Agent SKILL entrypoint — load this when invoking the system as a skill |
| `colors_and_type.css` | CSS variables for the full type + color system + semantic tokens (`--h1`, `--body`, `--ink`, `--bone`, etc.) |
| `assets/` | Logos, monograms, placeholder textures, icon SVGs |
| `preview/` | Design-system cards (typography, color, spacing, components) — rendered in the Design System tab |
| `ui_kits/website/` | Marketing-site UI kit: home, collections, kitchen detail, journal, contact |

## Content fundamentals

The voice is **quiet, confident, specific.** Imperia is the older craftsman in the room — the one who has built rooms like this fifty times, doesn't oversell, and lets the work speak.

**Tone.** Restrained. No exclamation marks. No superlatives unless they're earned by a measurable detail. Where possible, replace adjectives ("beautiful," "luxurious," "stunning") with the concrete fact that produced the impression ("hand-planed oak," "two coats of hand-rubbed lacquer," "shelves rebated into the carcass").

**Person.** Third-person for the company ("Imperia designs…", "the workshop in Zagreb…"). Second-person, sparingly, when speaking *to* a client about their kitchen ("Your kitchen is drawn full-size before any timber is cut"). Avoid "we" in marketing surfaces; it sounds startup-y. Use it only in correspondence and proposals.

**Casing.** Sentence case for headings, navigation, buttons. ALL-CAPS only for the wordmark and for one or two micro-labels per page (eyebrow tags above section heads — e.g. *COLLECTIONS*, *THE WORKSHOP*). Title Case is never used.

**Language.** Bilingual where appropriate. The primary surface language is Croatian; the system is built so English copy slots in as a sibling translation, not a fallback. Examples of on-brand Croatian copy:

> *Kuhinja se crta u stvarnoj veličini prije nego što se odreže prvi komad drveta.*
> *Svaka Imperia kuhinja izrađena je u jednoj radionici, od jednog tima.*
> *Ručno brušeno. Ručno lakirano. Bez kompromisa.*

And in English:

> *Every Imperia kitchen is drawn full-size, by hand, before a single piece of timber is cut.*
> *One workshop. One team. One kitchen at a time.*

**Emoji.** Never. Not in product, not in marketing, not in social. Use a typographic mark (·, —, ⟶) or an iconographic SVG instead.

**Numbers & units.** Spell out one to nine; numerals from 10. Use the thin-space thousands separator in Croatian-style copy (`12 400 mm`), comma as decimal where appropriate. Years are written in full (`2014`, never `'14`). Dimensions always carry units.

**Don't say.** *Stunning. Dream kitchen. Game-changing. Curated. Crafted with love. Where memories are made.* These are tells of the down-market category Imperia is explicitly not in.

**Do say.** *Drawn. Built. Fitted. Hand-finished. Solid oak / walnut / ash. Mortise and tenon. Soft-close. To order. Made in our workshop in [city].*

## Visual foundations

**The palette is austere on purpose.** A near-black ink, a warm bone, one warm timber accent, one mineral accent. Photography does the heavy chromatic lifting; the chrome stays out of the way.

- **Ink** `#1A1916` — primary text, headers, large flat backgrounds. Not pure black; warmed slightly so it reads with the bone.
- **Bone** `#F4EFE7` — primary background. Warm off-white, the colour of an oiled-paper architectural drawing.
- **Walnut** `#6B4A2B` — accent reserved for moments that should feel timber-y: small marks, rule lines, the underline under a CTA. Never used for body text.
- **Brass** `#A48758` — secondary accent. Used at quarter-strength for hairline rules and the wordmark monogram. Never for fills larger than a small button.
- **Stone** `#8B847A` — neutral grey used for secondary copy, captions, meta.
- **Sage** `#5A6650` — single cool note, used very sparingly, for status / availability ribbons and one or two charts.

**Typography is a pair.** A high-contrast didone-adjacent serif (display) and a quiet humanist sans (body / UI).

- **Display: Cormorant Garamond.** Set in `400` italic for the most personal lines (signatures, journal pull-quotes); `500` upright for headlines. Tracked tight (`-0.01em`). Very large sizes (96px+) are encouraged for the wordmark and section hero lines.
- **Body & UI: Manrope.** Set in `400` for paragraphs, `500` for buttons and nav, `600` only for the rare emphasis. Tracked normal. Body line-height is generous (1.6).
- **Micro-eyebrow:** Manrope `500`, letter-spaced `0.18em`, ALL CAPS, 11–12px. Used above section headings as a quiet label.

**Spacing.** A 4-px base unit, but the layout system thinks in 8-px multiples for components and 24-px multiples for page rhythm. Vertical rhythm between hero sections is `120–160px` on desktop. Generous gutters: `48px` minimum between editorial columns, `96px` from page-edge on landing pages above 1440px.

**Backgrounds.** Two modes:
1. **Bone editorial** — bone background, ink type, generous whitespace. Default for most pages.
2. **Ink hero** — ink background, bone type, hero photograph bleeding to the edge of the viewport. Used for landing, collection covers, the journal masthead.

No gradients. No patterns. No textures except a single subtle paper grain available as `assets/paper-grain.svg` for very specific dark backgrounds — used at 4–6% opacity, never more.

**Imagery.** Always full-bleed where possible, never floated mid-paragraph. Warm-leaning grade — slight desaturation in the cools, retained warmth in shadows. Never B&W (the brand is about timber tone). Never heavy grain. Photography always shows either (a) a full room with natural light from one direction, or (b) a tight detail of a single material at hand-distance.

**Animation.** Restrained. Hover states use an opacity drop (`opacity: 0.7`) on links or a 1-pixel rule that draws in from left to right under text. No transforms, no scale, no springs. Page transitions use a 280ms ease-out cross-fade where used at all. Animation easing: `cubic-bezier(0.2, 0.6, 0.2, 1)` for any motion.

**Hover & press.** Links: text colour stays, a 1-px walnut rule appears underneath, 200ms ease. Buttons (ink-filled): on hover, fill shifts to walnut. On press, fill goes 4% darker — no scale. Cards (image tiles): on hover, the caption block beneath the image slides up 4px and a hairline rule appears across the top of the card.

**Borders & rules.** 1-px walnut at 20% opacity is the workhorse rule, used to separate editorial blocks. Section dividers use a centred 24-px walnut bar at full strength. Corners are sharp — radius is `0` by default. Buttons use a `2px` radius. Image tiles use `0`. The only radius above 4px is on the rare profile-photo circle (full round).

**Shadows.** Minimal. One elevation level: `0 1px 0 rgba(26,25,22,0.06), 0 24px 48px -24px rgba(26,25,22,0.20)`. Used on the sticky header when it crosses an image, and on the contact form card. That's it.

**Transparency & blur.** The sticky header uses a `backdrop-filter: blur(16px)` over a `rgba(244,239,231,0.86)` bone, *only* when scrolled. At rest it is fully opaque or transparent depending on the page hero. Modal backdrops use a `rgba(26,25,22,0.72)` ink wash, no blur.

**Layout rules.** A 12-column grid with 24px gutters; max content width `1440px`; editorial copy max-measure `64ch`. Numbers in section headers (e.g. `01 · The Drawing`) anchor a column of their own at the left margin.

**Cards.** Imperia "cards" are rarely cards in the box-shadow sense. The default product / kitchen card is an image, a hairline rule beneath it, a name set in Cormorant `500` at 22px, a one-line description in Manrope 14px Stone, and a price-on-request line. No border. No shadow. No background fill. The card *is* the photograph and the type beneath.

## Iconography

The system uses **two icon registers**:

1. **Hairline line icons** — 1.25px stroke, sharp corners, 24×24 viewBox. Used for UI actions (menu, close, search, arrow). Source: **Lucide** via CDN. Specific icons used in the kit: `menu`, `x`, `search`, `arrow-right`, `arrow-up-right`, `chevron-down`, `plus`, `minus`, `mail`, `phone`, `map-pin`, `instagram`. Lucide is loaded from `https://unpkg.com/lucide@latest`. Stroke colour matches the surrounding type (ink on bone surfaces; bone on ink surfaces).
2. **Editorial marks** — original SVGs in `assets/marks/`. The wordmark, the Imperia monogram (an "I" inside a thin rectangle, suggestive of a cabinet door), and three section marks used as section dividers in the journal. These are *not* icons in the UI sense — they're typographic ornaments. Drawn in a heavier weight than the line icons, in walnut.

**No emoji.** **No unicode pictographs.** **No icon font.** **No coloured / filled illustration icons.** If a concept needs a richer representation than a hairline mark, it gets a small photograph (a hand on a plane, a sample of timber) — never a cartoon icon.

**Sizes.** Line icons appear at `16px` (inline with body), `20px` (navigation, buttons), and `24px` (large UI controls). Editorial marks appear at `48–96px`.

## Substitutions to confirm

- **Fonts.** Cormorant Garamond and Manrope are loaded from Google Fonts. If Imperia has commissioned or licensed display faces (likely for a brand of this register), drop the `.woff2` files into `fonts/` and update `colors_and_type.css`. The closest commercial equivalents would be *Reckless* or *Söhne* — flag if a swap is required.
- **Logo.** The wordmark in `assets/logo.svg` is an original setting of "IMPERIA" in Cormorant Garamond `500` with custom tracking and a small monogram glyph. Replace with the official wordmark if one exists.
- **Photography.** Every image in the UI kit is an `<image-slot>` placeholder. The user must supply real kitchen photography for any production use.
- **Icons.** Lucide is used via CDN for UI icons. If Imperia has a proprietary icon set, drop it into `assets/icons/` and update references.
