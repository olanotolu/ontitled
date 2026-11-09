# [Ontitled]

Single-page site for **[Ontitled]** — "We make old giants dance again."

## Structure

```text
app/layout.tsx      # Bare Next.js root layout
public/omposition.html   # The page (served at / via rewrite)
next.config.ts      # / → /omposition.html
```

## Routes

| URL | Serves |
|-----|--------|
| `/` | `public/omposition.html` |

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
npm run build
vercel deploy
```
