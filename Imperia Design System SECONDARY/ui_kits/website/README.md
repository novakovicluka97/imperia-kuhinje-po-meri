# Imperia · Marketing Website UI Kit

A pixel-leaning recreation of the Imperia marketing site, in the luxury-bespoke-kitchen visual register defined in the root README.md.

## What's here

| File | Purpose |
|---|---|
| `index.html` | Interactive demo — click-through between Home, Collection, Kitchen detail, Journal, Contact. Load this. |
| `app.jsx` | Top-level app with route state |
| `primitives.jsx` | `Eyebrow`, `Button`, `Rule`, `NumeralHeader`, `Icon` |
| `Header.jsx` | Sticky top nav with language toggle |
| `Footer.jsx` | Address block, social, fine print |
| `HomePage.jsx` | Landing — hero, intro, three feature kitchens, "the workshop" strip, journal teaser |
| `CollectionPage.jsx` | Grid of completed kitchens with filter rail |
| `KitchenDetailPage.jsx` | Single project — full-bleed hero, drawing, materials, photographs |
| `JournalPage.jsx` | Editorial article list + open article |
| `ContactPage.jsx` | Two-column: address + form |
| `image-slot.js` | `<image-slot>` web component for user-fillable photography |

## How to use the kit in a design

1. Open `index.html` to see the full prototype.
2. Components are framework-light React (Babel-in-browser). Copy any component file into a new mock — they reference only the root `colors_and_type.css` and a handful of inline styles.
3. Any `<image-slot>` is a drop zone — the user drags a real photo in and it persists.

## Notes on fidelity

- All copy is original to Imperia and bilingual where shown (HR / EN).
- No third-party brand marks, photography, or distinctive UI patterns are reproduced. The aesthetic conventions used (refined serif display, dark-on-bone palette, generous whitespace, full-bleed photography) are common to the bespoke-kitchen *category*.
- Photography is represented with `<image-slot>` placeholders.
- Icons are inline Lucide SVGs at 1.25-px stroke.
