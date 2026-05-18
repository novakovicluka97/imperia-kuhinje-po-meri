/**
 * make-icons.mjs — generates PNG icons and the social-share image.
 * -------------------------------------------------------------------------
 * Reads  favicon.svg                 (the master mark)
 *        assets/images/hero/hero.jpg (background for the share card)
 * Writes assets/icons/apple-touch-icon.png  (180×180)
 *        assets/icons/icon-192.png          (192×192, PWA manifest)
 *        assets/icons/icon-512.png          (512×512, PWA manifest)
 *        assets/icons/og-image.jpg          (1200×630, social sharing)
 *
 * These are functional placeholders — replace them with the final brand
 * artwork when it is ready (see PREOSTALO.md).
 *
 * Run:  node make-icons.mjs   (from the tools/ directory)
 * -------------------------------------------------------------------------
 */
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const ICONS = join(ROOT, 'assets', 'icons');

await mkdir(ICONS, { recursive: true });

/* --- PNG icons from favicon.svg ------------------------------------------- */
const faviconSvg = await readFile(join(ROOT, 'favicon.svg'));
const iconSizes = [
  [180, 'apple-touch-icon.png'],
  [192, 'icon-192.png'],
  [512, 'icon-512.png'],
];
for (const [size, name] of iconSizes) {
  await sharp(faviconSvg, { density: 512 })
    .resize(size, size)
    .flatten({ background: '#0B0B0B' })
    .png()
    .toFile(join(ICONS, name));
  console.log('icon:', name);
}

/* --- Social share image (Open Graph) -------------------------------------- */
const W = 1200;
const H = 630;
const heroJpg = await readFile(join(ROOT, 'assets', 'images', 'hero', 'hero.jpg'));

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0B0B0B" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0B0B0B" stop-opacity="0.88"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="${W / 2}" y="305" text-anchor="middle" fill="#F0EBE1"
        font-family="Georgia, 'Times New Roman', serif" font-weight="500"
        font-size="108" letter-spacing="18">IMPERIA</text>
  <rect x="${W / 2 - 46}" y="345" width="92" height="2" fill="#C9A977"/>
  <text x="${W / 2}" y="408" text-anchor="middle" fill="#C9A977"
        font-family="Georgia, serif" font-size="33" letter-spacing="3">
    Kuhinje po meri &#8211; Beograd i Novi Sad</text>
</svg>`;

await sharp(heroJpg)
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(join(ICONS, 'og-image.jpg'));
console.log('og-image.jpg created');

console.log('\nDone.');
