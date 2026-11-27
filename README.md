# [Ontitled]

Single-page site for **[Ontitled]** — "what exists is not all that can exist."

## Structure

```text
app/layout.tsx      # Bare Next.js root layout
public/index.html   # The page (served at / via rewrite)
next.config.ts      # / → /index.html
```

## Routes

| URL | Serves |
|-----|--------|
| `/` | `public/index.html` |

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
npx wrangler pages deploy public --project-name ontitled
```
