#!/usr/bin/env python3
from pathlib import Path

old_mjs = r'Shape the future of creative AI with real human taste, all backed by the commission-free network trusted by\xA0top\xA0creatives.'
new_text = 'A stamped coin ended the need to weigh gold at every trade. Dyson stamps machine labor the same way - priced once, trusted everywhere.'

# Fix route module
p = Path('public/contra-assets/XCu_QFkRH7cgYOrscg0Bj4mKd-BmpS13Qak4ZUhMghI.CEE-O19T.mjs')
t = p.read_text(errors='ignore')
count = t.count(old_mjs)
print(f'Route module: {count} matches')
if count:
    t = t.replace(old_mjs, new_text)
    p.write_text(t)
    print('Route module written')

# Fix dyson.html - try multiple nbsp variants
p2 = Path('public/dyson.html')
t2 = p2.read_text(errors='ignore')
variants = [
    'Shape the future of creative AI with real human taste, all backed by the commission-free network trusted by&nbsp;top&nbsp;creatives.',
    'Shape the future of creative AI with real human taste, all backed by the commission-free network trusted by\xa0top\xa0creatives.',
    'Shape the future of creative AI with real human taste, all backed by the commission-free network trusted by top creatives.',
]
total = 0
for v in variants:
    c = t2.count(v)
    if c:
        t2 = t2.replace(v, new_text)
        total += c
print(f'dyson.html: {total} matches')
if total:
    p2.write_text(t2)
    print('dyson.html written')

print('Done')
