const fs = require('node:fs/promises');
const path = require('node:path');
const https = require('node:https');
const { createHash } = require('node:crypto');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'contra-assets');
const INDEX_PATH = path.join(PUBLIC_DIR, 'index.html');

// All unique framerusercontent.com images (base paths without query params)
const FRAMER_IMAGES = [
  'dc0HCQu9MOwmPplhGwTUBAfUU.png',
  'ccHF8iKH65uV2DJOBHVWljt3Ak.png',
  'Vhbey8TUS8Eth6eZyXTZKwcsRUE.png',
  'EAqiHb4AngRpeOiVRA9km1enQ.png',
  'bzHkU0aY4SWyBrCK9Lpt3zkqlo.png',
  '59Plf0mIk2cUZeytrhrQk5WRtY.png',
  'OxFOG5Cw2HKLKUUNPVXXZFa1rw.png',
  '4pauXyv18v81ju8JjJ6uJxn2b0.png',
  'ET4YASQmQ02yElm5yCqr6JYcqqM.png',
  'N2XpPqGIQjGLnxH9fuIlBpA9rAo.png',
  'Ng6mSxsboVc1qOLWBeyBveA8Jgg.png',
  'XdnnR9bU4GXUBbkKHCrcZXA0Qg.png',
  'oYkAKsnnqbmqnbmJtnKwBLWIMc.png',
  'xIEeTzfpk3HQ88ROICOZ1WCubU.png',
];

function download(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(new URL(res.headers.location, url).toString())
          .then(resolve)
          .catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy());
  });
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function downloadImages() {
  await fs.mkdir(ASSETS_DIR, { recursive: true });
  
  for (const filename of FRAMER_IMAGES) {
    const destPath = path.join(ASSETS_DIR, filename);
    if (await exists(destPath)) {
      console.log(`Already exists: ${filename}`);
      continue;
    }
    
    const url = `https://framerusercontent.com/images/${filename}`;
    try {
      console.log(`Downloading: ${filename}`);
      const data = await download(url);
      await fs.writeFile(destPath, data);
      console.log(`  Saved: ${filename} (${data.length} bytes)`);
    } catch (e) {
      console.error(`  FAILED: ${filename} - ${e.message}`);
    }
  }
}

async function rewriteIndexHtml() {
  let html = await fs.readFile(INDEX_PATH, 'utf8');
  let changeCount = 0;

  // 1. Replace ALL framerusercontent.com image URLs with local paths
  //    Pattern: https://framerusercontent.com/images/FILENAME?... -> /contra-assets/FILENAME
  const framerRegex = /https?:\/\/framerusercontent\.com\/images\/([a-zA-Z0-9_-]+\.[a-z]+)(?:\?[^"'\s)]*)?/g;
  html = html.replace(framerRegex, (match, filename) => {
    changeCount++;
    return `/contra-assets/${filename}`;
  });

  // 2. Remove Segment analytics script (lines 371-373)
  const segmentStart = html.indexOf('<!-- Snippet: jYmKazhUs -->');
  const segmentEnd = html.indexOf('<!-- SnippetEnd: jYmKazhUs -->');
  if (segmentStart !== -1 && segmentEnd !== -1) {
    html = html.substring(0, segmentStart) + html.substring(segmentEnd + '<!-- SnippetEnd: jYmKazhUs -->'.length);
    changeCount++;
    console.log('Removed Segment analytics script');
  }

  // 3. Remove Framer analytics script
  html = html.replace(
    /\t<script async src="https:\/\/events\.framer\.com\/script\?v=2"[^>]*><\/script>\n/g,
    ''
  );
  changeCount++;
  console.log('Removed Framer analytics script');

  // 4. Remove fonts.gstatic.com preconnect
  html = html.replace(
    /\t<link href="https:\/\/fonts\.gstatic\.com" rel="preconnect" crossorigin>\n/g,
    ''
  );
  changeCount++;
  console.log('Removed fonts.gstatic.com preconnect');

  // 5. Fix contralabs.com canonical and og:url
  html = html.replace(
    '<link rel="canonical" href="https://contralabs.com/">',
    '<link rel="canonical" href="/">'
  );
  html = html.replace(
    '<meta property="og:url" content="https://contralabs.com/">',
    '<meta property="og:url" content="/">'
  );
  changeCount++;
  console.log('Fixed contralabs.com references');

  await fs.writeFile(INDEX_PATH, html, 'utf8');
  console.log(`\nTotal URL replacements: ${changeCount}`);
}

async function main() {
  console.log('=== Downloading framerusercontent.com images ===\n');
  await downloadImages();
  
  console.log('\n=== Rewriting index.html ===\n');
  await rewriteIndexHtml();
  
  console.log('\n=== Done ===');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
