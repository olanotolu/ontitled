# [Ontitled]

Next.js app for **[Ontitled]** — product (Themis) + marketing site.

## Structure

```text
app/                 # Next.js App Router (auth, dashboard, playground, settings, API)
components/          # Shared React UI (AppShell, settings)
lib/                 # Auth0, Supabase, settings store helpers
public/              # Marketing HTML + static assets
  index.html         # Home (/) and Index (/index) Framer shell
  themis.html        # /themis
  company.html       # /company
  our-thesis.html    # /our-thesis
  contra-assets/     # Localized Framer assets
  auth/ fonts/       # Auth visuals + brand fonts
scripts/             # One-off marketing localization tools (not runtime)
supabase/            # Migrations + config
data/                # Local settings store (gitignored JSON)
_archive/            # Local-only Framer dumps / scratch (gitignored)
```

## Routes

### Marketing (static HTML via rewrites)

| URL | File |
|-----|------|
| `/` | `public/index.html` |
| `/index` | Index page (formerly Research) |
| `/themis` | `public/themis.html` |
| `/company` | `public/company.html` |
| `/our-thesis` | `public/our-thesis.html` |

`/research` and `/datasets` redirect to `/index`.

### Product (Next.js + Auth0)

| URL | Purpose |
|-----|---------|
| `/login`, `/signup` | Auth screens |
| `/dashboard` | Logged-in home |
| `/playground` | Themis playground |
| `/settings/*` | Profile, workspace, team, API keys, usage, billing, security |

## Setup

```bash
npm install
cp .env.example .env.local   # fill Auth0 + Supabase values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev              # local Next server
npm run build && npm start
npm run supabase:link    # link Supabase project
npm run supabase:push    # apply migrations
npm run supabase:types   # regenerate DB types → lib/supabase/
```

## Notes

- Marketing pages are Framer exports localized into `public/`. Re-import helpers live under `scripts/`.
- Product shell uses Auth0 (`lib/auth0.ts`, `proxy.ts` middleware).
- Workspace data uses Supabase (`lib/supabase/`) plus a local JSON settings store under `data/`.
