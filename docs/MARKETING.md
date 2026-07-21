# Marketing site (Phase 1)

Static Framer exports + a **shared Ontitled nav shell**. Product app (Auth0) stays separate.

## Route map (locked)

| URL | File | Notes |
|-----|------|--------|
| `/` | `public/home.html` | Brand home |
| `/index` | `public/index-page.html` | Creative Arena / research (was contralabs `/research`) |
| `/themis` | `public/themis.html` | Themis product marketing |
| `/company` | `public/company.html` | About |
| `/our-thesis` | `public/our-thesis.html` | Short thesis |
| `/research`, `/datasets` | → `/index` | Permanent redirects |
| `/dike`, `/jobs`, `/vision` | `home.html` (for now) | Catch-all until real pages exist |

Config: `next.config.ts` (`beforeFiles` rewrites + redirects).  
Auth: `proxy.ts` skips marketing paths; Auth0 only on app routes.

## Shared nav

| Asset | Role |
|-------|------|
| `public/marketing/nav.css` | Ribbon + bar + mobile drawer |
| `public/marketing/nav.js` | Mount nav, hide Framer/Contra chrome, current page |

Injected into every marketing HTML via:

```bash
python3 scripts/inject-marketing-nav.py
```

## Re-import from Framer

1. Export / save page HTML from Framer (or scrape a published URL).
2. Run:

```bash
npm run marketing:import -- --target index --from ./path/to/export.html
# targets: home | index | themis | company | thesis
```

This localizes `framerusercontent.com` assets into `public/contra-assets/`, light-rebrands, writes the target file, and re-injects the shared nav.

## Smoke checklist (5 minutes)

Run with `npm run dev`, then hard-refresh each URL (Cmd+Shift+R).

- [ ] **`/`** — home hero loads; **black** ribbon + **[Ontitled]** nav (not Contra)
- [ ] **`/index`** — “Creative intelligence.” content; same Ontitled nav; **no** splash; **no** “contra LABS”
- [ ] **Refresh `/index`** — still Index content (not home glitch)
- [ ] **`/themis`** — Themis page + shared nav
- [ ] **`/company`** — About + shared nav (legacy company nav hidden)
- [ ] **`/our-thesis`** — thesis + shared nav
- [ ] **`/research`** — redirects to `/index`
- [ ] **Nav links** — Themis, Dike, Index, Jobs, Company all resolve (no 500)
- [ ] **Get in touch** — opens partnership CTA
- [ ] **Mobile** (&lt;810px) — hamburger opens drawer
- [ ] **`/login`** — still product Auth0 screen (not marketing)

## Architecture rule

```
Marketing  = public/*.html + /marketing/nav.* + rewrites
Product    = app/* + Auth0 + Supabase
Framer     = design tool only (export → import script)
```
