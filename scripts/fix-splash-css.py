#!/usr/bin/env python3
"""Fix splash screen CSS for mobile in themis.html."""
from pathlib import Path

p = Path('public/themis.html')
t = p.read_text()

# Fix 1: Add height:auto to zubHS override + mobile media query
# The file may already have height:auto from a previous edit
# Try both patterns
for old1, new1 in [
    (
        'framer-zubHS.framer-4hq84l{\n  width:auto!important;\n}\n</style><style>',
        'framer-zubHS.framer-4hq84l{\n  width:auto!important;\n  height:auto!important;\n}\n'
        '@media(max-width:809.98px){\n'
        '  .framer-zGvwE::after{font-size:clamp(28px,8vw,40px)!important;}\n'
        '  .framer-zubHS .framer-1y9ct2h{min-height:32px!important;}\n'
        '}\n</style><style>'
    ),
    (
        'framer-zubHS.framer-4hq84l{\n  width:auto!important;\n  height:auto!important;\n}\n</style><style>',
        'framer-zubHS.framer-4hq84l{\n  width:auto!important;\n  height:auto!important;\n}\n'
        '@media(max-width:809.98px){\n'
        '  .framer-zGvwE::after{font-size:clamp(28px,8vw,40px)!important;}\n'
        '  .framer-zubHS .framer-1y9ct2h{min-height:32px!important;}\n'
        '}\n</style><style>'
    ),
]:
    if old1 in t:
        t = t.replace(old1, new1, 1)
        break

# Fix 2: NLAj7 height
old2 = 'width:220px!important;}'
new2 = 'width:220px!important;height:auto!important;min-height:46px;}'
if old2 in t:
    t = t.replace(old2, new2, 1)

# Fix 3: NLAj7 responsive font (only in the ::after rule)
old3 = 'font-size:46px;letter-spacing:-2px;color:var(--k9rho8'
new3 = 'font-size:clamp(28px,5vw,46px);letter-spacing:-2px;color:var(--k9rho8'
if old3 in t:
    t = t.replace(old3, new3, 1)

p.write_text(t)

# Verify
assert '@media(max-width:809.98px)' in t, 'media query missing'
assert 'min-height:46px' in t, 'min-height missing'
assert 'clamp(28px,5vw,46px)' in t, 'clamp font missing'
assert 'height:auto!important;\n}' in t, 'height auto missing'
print('All fixes applied successfully')
