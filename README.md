# [Ontitled]

Next.js app for **[Ontitled]** — product (Themis) + marketing site.

## Structure

```text
app/                 # Product (Auth0): login, dashboard, playground, settings, API
components/          # Shared React UI (AppShell, settings)
lib/                 # Auth0, Supabase, settings helpers
public/
  home.html          # /
  index-page.html    # /index  (Creative Arena / research)
  themis.html        # /themis
  company.html       # /company
  our-thesis.html    # /our-thesis
  marketing/         # Shared Ontitled nav (nav.css + nav.js)
  contra-assets/     # Localized Framer assets
  auth/ fonts/
scripts/
  inject-marketing-nav.py   # Attach shared nav to HTML pages
  marketing-import.mjs      # Import Framer HTML → public/
  marketing-smoke.mjs       # Smoke-test marketing routes
docs/MARKETING.md    # Phase 1 marketing guide + checklist
supabase/            # Migrations
```

## Routes

### Marketing (static HTML + rewrites)

| URL | File |
|-----|------|
| `/` | `public/home.html` |
| `/index` | `public/index-page.html` |
| `/themis` | `public/themis.html` |
| `/company` | `public/company.html` |
| `/our-thesis` | `public/our-thesis.html` |

`/research` and `/datasets` redirect to `/index`.

Auth middleware **does not** run on marketing paths.

### Product (Next.js + Auth0)

| URL | Purpose |
|-----|---------|
| `/login`, `/signup` | Auth |
| `/dashboard` | Logged-in home |
| `/playground` | Themis playground |
| `/settings/*` | Account / workspace |

## Setup

```bash
npm install
cp .env.example .env.local   # Auth0 + Supabase
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Marketing commands

```bash
# Re-attach shared Ontitled nav to all marketing HTML
npm run marketing:nav

# Import a Framer export (localizes assets + injects nav)
npm run marketing:import -- --target index --from ./export.html
# targets: home | index | themis | company | thesis

# Smoke-test routes (dev server must be running)
npm run marketing:smoke
```

Full checklist: [docs/MARKETING.md](docs/MARKETING.md).

## Other scripts

```bash
npm run build && npm start
npm run typecheck
npm run supabase:link
npm run supabase:push
npm run supabase:types
```

## Architecture

```
Marketing  = public/*.html + public/marketing/nav.* + next rewrites
Product    = app/* + Auth0 + Supabase
Framer     = design tool only → export → marketing:import
```
