/**
 * STEP 2 — Optimize images
 * -------------------------------------------------------------------------
 * Reads  tools/data/downloads/        (originals from step 1)
 *        tools/data/gallery.json      (manifest from step 1)
 * Writes assets/images/gallery/full/  NN.webp + NN.jpg  (lightbox size)
 *        assets/images/gallery/thumb/ NN.webp + NN.jpg  (grid size)
 *        assets/images/hero/          hero.webp/.jpg + hero-mobile.webp
 *        tools/data/gallery.json      (updated with output paths + sizes)
 *
 * Uses `sharp`. If sharp is not installed it FALLS BACK to copying the
 * originals unchanged (the site still works, just heavier) — it never
 * hard-fails.
 *
 * Run:  npm run optimize   (from the tools/ directory)
 * -------------------------------------------------------------------------
 */
import { readFile, writeFile, mkdir, copyFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/* ===========================================================================
 * HERO IMAGE — change this id to use a different photo as the full-screen hero.
 * It must match an `id` in tools/data/gallery.json (e.g. "01", "23").
 * ========================================================================= */
const HERO_ID = '23';

/* Output sizing */
const FULL_MAX = 1280; // longest edge of the lightbox image
const THUMB_MAX = 760; // longest edge of the grid thumbnail
const HERO_MAX = 1600; // longest edge of the desktop hero
const HERO_MOBILE_W = 840; // width of the mobile hero

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const DATA_DIR = join(HERE, 'data');
const DOWNLOAD_DIR = join(DATA_DIR, 'downloads');
const GALLERY_JSON = join(DATA_DIR, 'gallery.json');
const FULL_DIR = join(ROOT, 'assets', 'images', 'gallery', 'full');
const THUMB_DIR = join(ROOT, 'assets', 'images', 'gallery', 'thumb');
const HERO_DIR = join(ROOT, 'assets', 'images', 'hero');

async function loadSharp() {
  try {
    const mod = await import('sharp');
    return mod.default;
  } catch {
    return null;
  }
}

async function main() {
  await mkdir(FULL_DIR, { recursive: true });
  await mkdir(THUMB_DIR, { recursive: true });
  await mkdir(HERO_DIR, { recursive: true });

  const data = JSON.parse(await readFile(GALLERY_JSON, 'utf8'));
  const sharp = await loadSharp();

  if (!sharp) {
    console.warn('⚠ `sharp` is not installed — falling back to copying originals.');
    console.warn('  For smaller, faster images run:  npm install   then re-run this step.\n');
  }

  let heroSource = null;

  for (const img of data.images) {
    const srcPath = join(DOWNLOAD_DIR, img.download);
    try {
      await stat(srcPath);
    } catch {
      console.warn(`  [${img.id}] missing download (${img.download}) — skipped`);
      continue;
    }

    if (sharp) {
      /* ---- optimized path ------------------------------------------------ */
      const base = sharp(srcPath, { failOn: 'none' });
      const meta = await base.metadata();

      await sharp(srcPath, { failOn: 'none' })
        .resize(FULL_MAX, FULL_MAX, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(join(FULL_DIR, `${img.id}.webp`));
      await sharp(srcPath, { failOn: 'none' })
        .resize(FULL_MAX, FULL_MAX, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(join(FULL_DIR, `${img.id}.jpg`));
      await sharp(srcPath, { failOn: 'none' })
        .resize(THUMB_MAX, THUMB_MAX, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 74 })
        .toFile(join(THUMB_DIR, `${img.id}.webp`));
      await sharp(srcPath, { failOn: 'none' })
        .resize(THUMB_MAX, THUMB_MAX, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 72, mozjpeg: true })
        .toFile(join(THUMB_DIR, `${img.id}.jpg`));

      const w = meta.width || img.srcWidth || 1080;
      const h = meta.height || img.srcHeight || 1080;
      const scale = Math.min(1, FULL_MAX / Math.max(w, h));
      img.width = Math.round(w * scale);
      img.height = Math.round(h * scale);
      img.thumbWebp = `${img.id}.webp`;
      img.thumbSrc = `${img.id}.jpg`;
      img.fullWebp = `${img.id}.webp`;
      img.fullSrc = `${img.id}.jpg`;
    } else {
      /* ---- fallback path: copy original unchanged ------------------------ */
      const ext = img.download.split('.').pop();
      await copyFile(srcPath, join(FULL_DIR, `${img.id}.${ext}`));
      await copyFile(srcPath, join(THUMB_DIR, `${img.id}.${ext}`));
      img.width = img.srcWidth || 1080;
      img.height = img.srcHeight || 1080;
      img.thumbWebp = null;
      img.thumbSrc = `${img.id}.${ext}`;
      img.fullWebp = null;
      img.fullSrc = `${img.id}.${ext}`;
    }

    if (img.id === HERO_ID) heroSource = srcPath;
    console.log(`  [${img.id}] ${img.label}  ${img.width}×${img.height}`);
  }

  /* ---- hero image ------------------------------------------------------- */
  if (!heroSource) {
    heroSource = join(DOWNLOAD_DIR, data.images[0]?.download || '');
    console.warn(`⚠ HERO_ID "${HERO_ID}" not found — using the first image instead.`);
  }
  if (sharp && heroSource) {
    await sharp(heroSource, { failOn: 'none' })
      .resize(HERO_MAX, HERO_MAX, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(join(HERO_DIR, 'hero.webp'));
    await sharp(heroSource, { failOn: 'none' })
      .resize(HERO_MAX, HERO_MAX, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(join(HERO_DIR, 'hero.jpg'));
    await sharp(heroSource, { failOn: 'none' })
      .resize(HERO_MOBILE_W, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(HERO_DIR, 'hero-mobile.webp'));
    console.log(`  [hero] built from image ${HERO_ID}`);
  } else if (heroSource) {
    const ext = heroSource.split('.').pop();
    await copyFile(heroSource, join(HERO_DIR, `hero.${ext}`));
    console.log(`  [hero] copied original (id ${HERO_ID})`);
  }

  data.heroId = HERO_ID;
  data.optimized = Boolean(sharp);
  await writeFile(GALLERY_JSON, JSON.stringify(data, null, 2));
  console.log(`\nDone. ${data.images.length} images processed. optimized=${Boolean(sharp)}`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
