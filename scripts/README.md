# Scripts

One-off tooling used when localizing the Framer marketing export into `public/`.

| Script | Purpose |
|--------|---------|
| `download-contra-assets.js` | Download remote Framer assets into `public/contra-assets/` |
| `localize-external.js` | Rewrite external URLs in HTML to local paths |
| `fix-contra-refs.py` | Fix leftover Contra path references |
| `fix-splash-css.py` | Splash/preloader CSS fixes |
| `fix-text.py` | Brand/copy text substitutions |

Not part of the production runtime. Run only when re-importing marketing HTML.
