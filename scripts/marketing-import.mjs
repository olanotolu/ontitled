#!/usr/bin/env node
/**
 * Phase 1: Import a Framer HTML export into public/ and localize assets.
 *
 * Usage:
 *   node scripts/marketing-import.mjs --target home --from ./export.html
 *   node scripts/marketing-import.mjs --target index --from ./research.html
 *   node scripts/marketing-import.mjs --target dyson --from ./dyson.html
 *
 * After write, runs inject-marketing-nav.py so Ontitled nav is attached.
 */

import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const ASSETS = path.join(PUBLIC, "contra-assets");

const TARGETS = {
  home: "home.html",
  index: "index.html",
  dyson: "dyson.html",
  company: "company.html",
  thesis: "our-thesis.html",
};

function parseArgs(argv) {
  const out = { target: null, from: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--target") out.target = argv[++i];
    else if (argv[i] === "--from") out.from = argv[++i];
    else if (argv[i] === "--help" || argv[i] === "-h") out.help = true;
  }
  return out;
}

function download(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      { headers: { "User-Agent": "OntitledMarketingImport/1.0" }, timeout: 60000 },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(new URL(res.headers.location, url).toString())
            .then(resolve)
            .catch(reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (d) => chunks.push(d));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      }
    );
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("timeout")));
  });
}

function localName(url) {
  try {
    const u = new URL(url);
    const base = path.basename(decodeURIComponent(u.pathname));
    if (base && base !== "/" && base !== ".") return base;
  } catch {
    /* ignore */
  }
  return createHash("sha1").update(url).digest("hex").slice(0, 16);
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function localize(html) {
  await fs.mkdir(ASSETS, { recursive: true });
  const urlRe =
    /https:\/\/(?:framerusercontent\.com|framer\.com|unpkg\.com)[^"'\\s)]+/g;
  const urls = [...new Set(html.match(urlRe) || [])];
  const map = new Map();
  let ok = 0;
  let fail = 0;

  for (const url of urls) {
    if (url.includes("framer.com/edit")) continue;
    const base = url.split("?")[0];
    const name = localName(base);
    const dest = path.join(ASSETS, name);
    if (!(await exists(dest))) {
      try {
        let data;
        try {
          data = await download(url);
        } catch {
          data = await download(base);
        }
        await fs.writeFile(dest, data);
        ok++;
        console.log(`  + ${name} (${data.length})`);
      } catch (e) {
        fail++;
        console.warn(`  ! ${name}: ${e.message}`);
        continue;
      }
    }
    map.set(url, `/contra-assets/${name}`);
    map.set(base, `/contra-assets/${name}`);
  }

  let out = html;
  for (const [remote, local] of [...map.entries()].sort(
    (a, b) => b[0].length - a[0].length
  )) {
    out = out.split(remote).join(local);
  }

  // Brand light-touch
  out = out
    .replaceAll("Contra Labs", "[Ontitled]")
    .replaceAll("contralabs.com", "ontitled.com")
    .replaceAll("href=\"/research\"", 'href="/index"')
    .replaceAll("href=\"./research\"", 'href="/index"')
    .replaceAll("path:`/research", "path:`/index");

  // Strip analytics
  out = out.replace(
    /<script[^>]+src="https:\/\/cdn\.segment\.com[^"]*"[^>]*>\s*<\/script>/gi,
    ""
  );
  out = out.replace(
    /<script[^>]+src="https:\/\/events\.framer\.com[^"]*"[^>]*>\s*<\/script>/gi,
    ""
  );

  console.log(`localized urls: mapped=${map.size} downloaded=${ok} failed=${fail}`);
  return out;
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.target || !args.from) {
    console.log(`Usage:
  npm run marketing:import -- --target <home|index|dyson|company|thesis> --from <file.html>

Targets:
${Object.entries(TARGETS)
  .map(([k, v]) => `  ${k.padEnd(10)} → public/${v}`)
  .join("\n")}
`);
    process.exit(args.help ? 0 : 1);
  }

  const destName = TARGETS[args.target];
  if (!destName) {
    console.error(`Unknown target "${args.target}". Use: ${Object.keys(TARGETS).join(", ")}`);
    process.exit(1);
  }

  const fromPath = path.resolve(args.from);
  if (!(await exists(fromPath))) {
    console.error(`Source not found: ${fromPath}`);
    process.exit(1);
  }

  console.log(`Import ${fromPath} → public/${destName}`);
  let html = await fs.readFile(fromPath, "utf8");
  html = await localize(html);

  const dest = path.join(PUBLIC, destName);
  await fs.writeFile(dest, html);
  console.log(`wrote ${dest}`);

  const inj = spawnSync("python3", [path.join(__dirname, "inject-marketing-nav.py"), destName], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (inj.status !== 0) {
    console.error("nav inject failed");
    process.exit(inj.status || 1);
  }
  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
