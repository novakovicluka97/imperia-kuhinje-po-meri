/**
 * STEP 3 — Generate gallery HTML
 * -------------------------------------------------------------------------
 * Reads  tools/data/gallery.json   (manifest from steps 1 & 2)
 * Edits  index.html      — fills the region between <!-- PREVIEW:START --> / END
 *        galerija.html   — fills the region between <!-- GALLERY:START --> / END
 *
 * Only the text BETWEEN the markers is replaced, so all hand-written HTML
 * around it is preserved. Safe to re-run after every content refresh.
 *
 * Run:  npm run generate   (from the tools/ directory)
 * -------------------------------------------------------------------------
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const GALLERY_JSON = join(HERE, 'data', 'gallery.json');

const PREVIEW_COUNT = 12; // images shown on the landing page before the gallery link

/** HTML-escape a string for safe use in attributes/text. */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Build one <figure> for the masonry grid. */
function figure(img, eager) {
  const thumbBase = 'assets/images/gallery/thumb/';
  const fullBase = 'assets/images/gallery/full/';
  const full = fullBase + (img.fullWebp || img.fullSrc);
  const loading = eager ? 'eager' : 'lazy';
  const fetchpriority = eager ? ' fetchpriority="high"' : '';

  const webpSource = img.thumbWebp
    ? `\n        <source type="image/webp" srcset="${thumbBase}${img.thumbWebp}">`
    : '';

  return `      <figure class="gallery__item" data-full="${esc(full)}" data-caption="${esc(img.label)}">
      <button class="gallery__open" type="button" aria-label="Uvećaj sliku: ${esc(img.label)}">
        <picture>${webpSource}
          <img src="${thumbBase}${img.thumbSrc}" alt="${esc(img.alt)}" width="${img.width}" height="${img.height}" loading="${loading}" decoding="async"${fetchpriority}>
        </picture>
      </button>
    </figure>`;
}

/** Replace the content between <!-- NAME:START --> and <!-- NAME:END -->. */
function spliceMarkers(html, name, inner) {
  const start = `<!-- ${name}:START -->`;
  const end = `<!-- ${name}:END -->`;
  const i = html.indexOf(start);
  const j = html.indexOf(end);
  if (i === -1 || j === -1) {
    throw new Error(`Markers ${start} / ${end} not found.`);
  }
  return html.slice(0, i + start.length) + '\n' + inner + '\n    ' + html.slice(j);
}

async function main() {
  const data = JSON.parse(await readFile(GALLERY_JSON, 'utf8'));
  const images = data.images.filter((im) => im.thumbSrc); // only processed images

  /* ---- galerija.html : every image -------------------------------------- */
  const galleryHtml = images.map((im, i) => figure(im, i < 4)).join('\n');
  const galleryPath = join(ROOT, 'galerija.html');
  let gallery = await readFile(galleryPath, 'utf8');
  gallery = spliceMarkers(gallery, 'GALLERY', galleryHtml);
  await writeFile(galleryPath, gallery);
  console.log(`galerija.html — wrote ${images.length} images.`);

  /* ---- index.html : preview grid ---------------------------------------- */
  const previewHtml = images
    .slice(0, PREVIEW_COUNT)
    .map((im) => figure(im, false))
    .join('\n');
  const indexPath = join(ROOT, 'index.html');
  let index = await readFile(indexPath, 'utf8');
  index = spliceMarkers(index, 'PREVIEW', previewHtml);
  await writeFile(indexPath, index);
  console.log(`index.html — wrote ${Math.min(PREVIEW_COUNT, images.length)} preview images.`);

  console.log('\nDone.');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
