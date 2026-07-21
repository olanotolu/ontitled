# Scripts

## Marketing (Phase 1)

| Command | Script | Purpose |
|---------|--------|---------|
| `npm run marketing:nav` | `inject-marketing-nav.py` | Inject `/marketing/nav.css` + `nav.js` into all marketing HTML |
| `npm run marketing:import` | `marketing-import.mjs` | Localize Framer HTML into `public/` + inject nav |
| `npm run marketing:smoke` | `marketing-smoke.mjs` | HTTP smoke checks against running dev server |

See [docs/MARKETING.md](../docs/MARKETING.md).

## Legacy Framer tooling

| Script | Purpose |
|--------|---------|
| `download-contra-assets.js` | Older bulk asset download |
| `localize-external.js` | Older index.html localizer |
| `fix-contra-refs.py` | Path reference fixes |
| `fix-splash-css.py` | Splash CSS (themis) |
| `fix-text.py` | Copy substitutions |

Prefer `marketing:import` for new exports.
