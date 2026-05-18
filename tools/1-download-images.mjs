/**
 * STEP 1 — Download images
 * -------------------------------------------------------------------------
 * Reads  tools/data/instagram-raw.json  (the Apify scrape)
 * Writes tools/data/downloads/NN.<ext>  (the original images)
 *        tools/data/gallery.json        (the manifest used by steps 2 & 3)
 *
 * Instagram CDN URLs expire a few days after scraping, so this step freezes
 * them locally. It is idempotent — already-downloaded files are skipped.
 *
 * Run:  npm run download   (from the tools/ directory)
 * -------------------------------------------------------------------------
 */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(HERE, 'data');
const DOWNLOAD_DIR = join(DATA_DIR, 'downloads');
const RAW_JSON = join(DATA_DIR, 'instagram-raw.json');
const GALLERY_JSON = join(DATA_DIR, 'gallery.json');

/* Map Instagram hashtags -> clean Serbian labels (used for alt text & captions).
 * Order matters: the first match wins, so put the most specific tags first. */
const TAG_LABELS = [
  ['#kuhinja', 'Kuhinja po meri'],
  ['#kitchen', 'Kuhinja po meri'],
  ['kuhinja', 'Kuhinja po meri'],
  ['#decijasoba', 'Dečija soba po meri'],
  ['#plakaripomeri', 'Plakar po meri'],
  ['#plakar', 'Plakar po meri'],
  ['#tvkomoda', 'TV komoda po meri'],
  ['#komoda', 'Komoda po meri'],
  ['#cipelarnik', 'Cipelarnik po meri'],
  ['#predsoblje', 'Predsoblje po meri'],
  ['#ogledalo', 'Ogledalo po meri'],
  ['#stolarija', 'Stolarija po meri'],
  ['#rucnoradjeno', 'Stolarija po meri'],
  ['#namestajpomeri', 'Nameštaj po meri'],
  ['#namestaj', 'Nameštaj po meri'],
];

/** Derive a clean, human label from a (spammy) Instagram caption. */
function labelFromCaption(caption) {
  const lc = (caption || '').toLowerCase();
  for (const [needle, label] of TAG_LABELS) {
    if (lc.includes(needle)) return label;
  }
  return 'Nameštaj po meri';
}

/** Pick a file extension from the CDN URL (.webp or .jpg). */
function extFromUrl(url) {
  const path = url.split('?')[0].toLowerCase();
  if (path.endsWith('.webp')) return 'webp';
  if (path.endsWith('.png')) return 'png';
  return 'jpg';
}

async function fileExists(path) {
  try {
    const s = await stat(path);
    return s.size > 0;
  } catch {
    return false;
  }
}

async function downloadOne(url, dest) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1024) throw new Error(`suspiciously small (${buf.length} bytes)`);
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  await mkdir(DOWNLOAD_DIR, { recursive: true });
  const raw = JSON.parse(await readFile(RAW_JSON, 'utf8'));

  /* Flatten every post into a single ordered list of images. */
  const flat = [];
  for (const post of raw.posts) {
    for (const m of post.media) {
      flat.push({
        shortCode: post.shortCode,
        postUrl: post.postUrl,
        type: post.type,
        caption: post.caption || '',
        url: m.url,
        srcWidth: m.width,
        srcHeight: m.height,
      });
    }
  }

  console.log(`Found ${flat.length} images across ${raw.posts.length} posts.`);

  const manifest = [];
  let ok = 0;
  let skipped = 0;
  const failed = [];

  for (let i = 0; i < flat.length; i++) {
    const item = flat[i];
    const id = String(i + 1).padStart(2, '0');
    const ext = extFromUrl(item.url);
    const downloadName = `${id}.${ext}`;
    const dest = join(DOWNLOAD_DIR, downloadName);

    if (await fileExists(dest)) {
      skipped++;
      console.log(`  [${id}] skip (already downloaded)`);
    } else {
      try {
        const bytes = await downloadOne(item.url, dest);
        ok++;
        console.log(`  [${id}] ok  ${(bytes / 1024).toFixed(0)} KB`);
      } catch (err) {
        failed.push({ id, url: item.url, error: String(err.message || err) });
        console.warn(`  [${id}] FAILED  ${err.message || err}`);
        continue;
      }
    }

    const label = labelFromCaption(item.caption);
    manifest.push({
      id,
      download: downloadName,
      shortCode: item.shortCode,
      postUrl: item.postUrl,
      type: item.type,
      label,
      alt: `${label} — Imperia, izrada nameštaja po meri Beograd i Novi Sad`,
      srcWidth: item.srcWidth,
      srcHeight: item.srcHeight,
    });
  }

  await writeFile(
    GALLERY_JSON,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), count: manifest.length, images: manifest },
      null,
      2,
    ),
  );

  console.log(`\nDone. downloaded=${ok} skipped=${skipped} failed=${failed.length}`);
  console.log(`Manifest written: ${GALLERY_JSON}`);
  if (failed.length) {
    console.warn('\n⚠ Some downloads failed (Instagram CDN URLs may have expired).');
    console.warn('  Re-run the Apify scrape to refresh the URLs in instagram-raw.json:');
    for (const f of failed) console.warn(`   - ${f.id}: ${f.error}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
