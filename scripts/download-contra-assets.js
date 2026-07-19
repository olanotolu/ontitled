const fs = require('node:fs/promises');
const path = require('node:path');
const https = require('node:https');
const http = require('node:http');
const { createHash } = require('node:crypto');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'contra-assets');
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'contra-asset-manifest.json');

const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.svg', '.ico',
  '.mp4', '.webm', '.mov', '.ogg', '.woff', '.woff2', '.ttf', '.otf',
  '.eot', '.gz', '.zip', '.pdf'
]);

const URL_REGEX = /https?:\/\/[^\s"'`<>()\[\]{}\\]+/g;

function cleanUrl(raw) {
  return raw.replace(/[)\]'`},;]+$/, '');
}

async function collectSourceFiles(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!BINARY_EXTENSIONS.has(ext)) {
      out.push(p);
    }
  }
  return out;
}

function download(url) {
  const fetchUrl = url.replace(/&amp;/g, '&');
  return new Promise((resolve, reject) => {
    const protocol = fetchUrl.startsWith('https:') ? https : http;
    const req = protocol.get(fetchUrl, { timeout: 30000 }, (res) => {
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
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function isAssetUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname === 'www.w3.org' || u.hostname === 'w3.org') return false;
    if (url.endsWith('/') || !u.pathname.includes('.')) return false;
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(ASSETS_DIR, { recursive: true });

  const sourceFiles = [path.join(PUBLIC_DIR, 'contra.html')];
  await collectSourceFiles(ASSETS_DIR, sourceFiles);

  const fileContents = new Map();
  const discovered = new Set();

  for (const file of sourceFiles) {
    try {
      const text = await fs.readFile(file, 'utf8');
      fileContents.set(file, text);
      for (const raw of text.match(URL_REGEX) || []) {
        const u = cleanUrl(raw);
        if (isAssetUrl(u)) discovered.add(u);
      }
    } catch (e) {
      console.error(`Read error ${file}: ${e.message}`);
    }
  }

  let manifest = {};
  if (await exists(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf8'));
    } catch { /* ignore */ }
  }

  for (const url of discovered) {
    if (manifest[url] !== undefined) continue;

    const parsed = new URL(url);
    let name = path.basename(parsed.pathname);
    name = decodeURIComponent(name).replace(/[^a-zA-Z0-9._-]/g, '_');
    if (!name || name === '_' || !name.includes('.')) {
      name = `asset-${createHash('md5').update(url).digest('hex').slice(0, 10)}`;
    }

    // If the same base asset was already saved locally (e.g. from the original
    // browser save or a previous run), reuse it rather than downloading a
    // resized / query-string variant that Framer may not serve directly.
    if (await exists(path.join(ASSETS_DIR, name))) {
      console.log(`Reusing local ${name} for ${url}`);
      manifest[url] = `/contra-assets/${name}`;
      continue;
    }

    let uniqueName = name;
    let counter = 1;
    while (await exists(path.join(ASSETS_DIR, uniqueName))) {
      const ext = path.extname(name);
      const base = path.basename(name, ext);
      uniqueName = `${base}-${counter}${ext}`;
      counter++;
    }

    let attempts = 0;
    let lastErr;
    while (attempts < 3) {
      try {
        console.log(`Downloading ${url} -> ${uniqueName}`);
        const data = await download(url);
        await fs.writeFile(path.join(ASSETS_DIR, uniqueName), data);
        manifest[url] = `/contra-assets/${uniqueName}`;
        break;
      } catch (e) {
        lastErr = e;
        attempts++;
        console.error(`  attempt ${attempts} failed: ${e.message}`);
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
    if (attempts === 3) {
      console.error(`  permanent failure for ${url}: ${lastErr.message}`);
      manifest[url] = null;
    }
  }

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  for (const [file, original] of fileContents) {
    let text = original;
    let changed = false;
    for (const [url, local] of Object.entries(manifest)) {
      if (!local) continue;
      if (!text.includes(url)) continue;
      text = text.replaceAll(url, local);
      changed = true;
    }
    if (changed) {
      await fs.writeFile(file, text, 'utf8');
      console.log(`Rewrote ${file}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
