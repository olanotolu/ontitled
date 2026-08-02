#!/usr/bin/env node
/**
 * Automated smoke checks for Phase 1 marketing routes.
 * Requires: npm run dev (default http://localhost:3000)
 *
 *   npm run marketing:smoke
 *   SMOKE_BASE=http://localhost:3000 npm run marketing:smoke
 */

const BASE = process.env.SMOKE_BASE || "http://localhost:3000";

const checks = [
  {
    path: "/",
    must: ["[Ontitled]", "marketing/nav.css", "marketing/nav.js"],
    mustNot: ["contra LABS"],
    name: "home",
  },
  {
    path: "/index",
    must: [
      "Creative intelligence",
      "CM7egJx8U",
      "marketing/nav.css",
      "marketing/nav.js",
      "[Ontitled]",
    ],
    mustNot: ["contra LABS", "Pre_Loader"],
    name: "index (research)",
  },
  {
    path: "/dyson",
    must: ["marketing/nav.css", "marketing/nav.js", "[Ontitled]"],
    mustNot: [],
    name: "dyson",
  },
  {
    path: "/company",
    must: ["marketing/nav.css", "marketing/nav.js", "About"],
    mustNot: [],
    name: "company",
  },
  {
    path: "/our-thesis",
    must: ["marketing/nav.css", "marketing/nav.js", "thesis"],
    mustNot: [],
    name: "thesis",
  },
];

async function fetchText(url) {
  const res = await fetch(url, { redirect: "manual" });
  const text = res.status === 200 ? await res.text() : "";
  return { res, text };
}

async function main() {
  let failed = 0;
  console.log(`Smoke base: ${BASE}\n`);

  // Redirect checks
  for (const [from, to] of [
    ["/research", "/index"],
    ["/datasets", "/index"],
  ]) {
    try {
      const res = await fetch(BASE + from, { redirect: "manual" });
      const loc = res.headers.get("location") || "";
      const ok =
        (res.status === 308 || res.status === 301 || res.status === 307) &&
        loc.includes(to);
      console.log(
        `${ok ? "✓" : "✗"} redirect ${from} → ${to} (status ${res.status}, loc=${loc})`
      );
      if (!ok) failed++;
    } catch (e) {
      console.log(`✗ redirect ${from}: ${e.message}`);
      failed++;
    }
  }

  for (const c of checks) {
    try {
      const { res, text } = await fetchText(BASE + c.path);
      const problems = [];
      if (res.status !== 200) problems.push(`status ${res.status}`);
      for (const m of c.must) {
        if (!text.toLowerCase().includes(m.toLowerCase())) {
          problems.push(`missing "${m}"`);
        }
      }
      for (const m of c.mustNot) {
        if (text.includes(m)) problems.push(`found forbidden "${m}"`);
      }
      if (problems.length) {
        console.log(`✗ ${c.name} (${c.path}): ${problems.join("; ")}`);
        failed++;
      } else {
        console.log(`✓ ${c.name} (${c.path})`);
      }
    } catch (e) {
      console.log(`✗ ${c.name}: ${e.message} (is dev server running?)`);
      failed++;
    }
  }

  console.log(failed ? `\n${failed} check(s) failed` : "\nAll smoke checks passed");
  process.exit(failed ? 1 : 0);
}

main();
