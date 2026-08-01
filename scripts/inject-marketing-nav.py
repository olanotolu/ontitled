#!/usr/bin/env python3
"""Inject shared Ontitled marketing nav into public HTML pages.

Idempotent: safe to re-run. Removes prior inline ot-nav blocks / company legacy
nav markers and ensures a single link to /marketing/nav.css + nav.js.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

MARKETING_PAGES = [
    "home.html",
    "index.html",
    "themis.html",
    "company.html",
    "our-thesis.html",
]

HEAD_SNIPPET = """
<link rel="stylesheet" href="/marketing/nav.css?v=97000" id="ot-marketing-nav-css" />
"""

BODY_SNIPPET = """
<script src="/marketing/nav.js?v=96000" id="ot-marketing-nav-js" defer></script>
"""


def strip_old_injections(html: str) -> str:
    # External tags
    html = re.sub(
        r'\s*<link[^>]+id="ot-marketing-nav-css"[^>]*/?>\s*',
        "\n",
        html,
        flags=re.I,
    )
    html = re.sub(
        r'\s*<script[^>]+id="ot-marketing-nav-js"[^>]*>\s*</script>\s*',
        "\n",
        html,
        flags=re.I,
    )
    html = re.sub(
        r'\s*<script[^>]+src="/marketing/nav\.js"[^>]*>\s*</script>\s*',
        "\n",
        html,
        flags=re.I,
    )
    html = re.sub(
        r'\s*<link[^>]+href="/marketing/nav\.css"[^>]*/?>\s*',
        "\n",
        html,
        flags=re.I,
    )

    # Prior inline blocks from Phase-0 index work
    html = re.sub(
        r'<style id="ontitled-nav-css">[\s\S]*?</style>',
        "",
        html,
        count=1,
    )
    html = re.sub(
        r'<script id="ontitled-nav-js">[\s\S]*?</script>',
        "",
        html,
        count=1,
    )
    # Path pin scripts we may have left
    html = re.sub(
        r'<script>\s*/\* (?:Keep /index stable|Refresh-safe /index)[\s\S]*?</script>',
        "",
        html,
        count=1,
    )
    html = re.sub(
        r'<script>\s*/\* Skip splash on Index[\s\S]*?</script>\s*<style id="no-splash-style">[\s\S]*?</style>',
        "",
        html,
        count=1,
    )
    return html


def inject(html: str) -> str:
    html = strip_old_injections(html)

    if 'id="ot-marketing-nav-css"' not in html:
        if re.search(r"</head\s*>", html, re.I):
            html = re.sub(
                r"</head\s*>",
                HEAD_SNIPPET + "</head>",
                html,
                count=1,
                flags=re.I,
            )
        else:
            html = HEAD_SNIPPET + html

    if 'id="ot-marketing-nav-js"' not in html and 'src="/marketing/nav.js?v=96000"' not in html:
        if re.search(r"</body\s*>", html, re.I):
            html = re.sub(
                r"</body\s*>",
                BODY_SNIPPET + "</body>",
                html,
                count=1,
                flags=re.I,
            )
        else:
            html = html + BODY_SNIPPET

    return html


def mark_company_legacy_nav(html: str) -> str:
    """Hide company.html's old static nav once shared nav mounts."""
    html = html.replace('<header class="nav"', '<header class="nav nav-legacy"')
    html = html.replace(
        '<a class="nav-ribbon"',
        '<a class="nav-ribbon nav-legacy"',
    )
    return html


def main() -> int:
    pages = MARKETING_PAGES
    if len(sys.argv) > 1:
        pages = sys.argv[1:]

    for name in pages:
        path = PUBLIC / name
        if not path.exists():
            print(f"skip missing {name}")
            continue
        raw = path.read_text(errors="ignore")
        out = inject(raw)
        if name == "company.html":
            out = mark_company_legacy_nav(out)
        path.write_text(out)
        ok_css = 'ot-marketing-nav-css' in out or "/marketing/nav.css" in out
        ok_js = 'ot-marketing-nav-js' in out or "/marketing/nav.js" in out
        print(f"{'OK' if ok_css and ok_js else 'WARN'} {name} css={ok_css} js={ok_js}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
