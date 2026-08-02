#!/usr/bin/env python3
"""Replace all visible 'Ontitled' references with '[Ontitled]' in HTML and JS files."""
import re
from pathlib import Path

# Files to process
html_files = [Path('public/home.html'), Path('public/dyson.html')]
mjs_files = list(Path('public/contra-assets').glob('*.mjs'))
js_files = list(Path('public/contra-assets').glob('*.js'))
json_files = list(Path('public/contra-assets').glob('*.json'))

# Skip patterns - don't replace these
skip_patterns = ['contra-assets', 'contralabs', 'contra.com', 'contrahq', 
                 'contra-asset', 'OntitledLabs', 'contralabs_ai', 'contra-assets/']

def should_skip(ctx):
    for p in skip_patterns:
        if p in ctx:
            return True
    return False

def replace_contra(text):
    # Replace visible "Ontitled" text but not URLs or identifiers
    # Pattern: Ontitled followed by space, apostrophe, quote, or end of word
    # But not part of contralabs, contra.com, etc.
    
    replacements = [
        # Specific phrases
        ('What is Ontitled Pro?', 'What is [Ontitled] Pro?'),
        ('Ontitled Pro is currently', '[Ontitled] Pro is currently'),
        ('Ontitled Pro', '[Ontitled] Pro'),
        ('Ontitled is setting', '[Ontitled] is setting'),
        ('How does Ontitled help', 'How does [Ontitled] help'),
        ('Ontitled connects', '[Ontitled] connects'),
        ('Ontitled helps', '[Ontitled] helps'),
        ('Ontitled to evaluate', '[Ontitled] to evaluate'),
        ('Ontitled to train', '[Ontitled] to train'),
        ('Using Ontitled', 'Using [Ontitled]'),
        ('with Ontitled', 'with [Ontitled]'),
        ('on Ontitled', 'on [Ontitled]'),
        ('by Ontitled', 'by [Ontitled]'),
        ('trusted by Ontitled', 'trusted by [Ontitled]'),
        ('Run by Ontitled', 'Run by [Ontitled]'),
        # Apostrophe variants
        ('Ontitled\u2019s reviewers', '[Ontitled]\u2019s reviewers'),
        ("Ontitled's reviewers", "[Ontitled]'s reviewers"),
        ('Ontitled\u2019s', '[Ontitled]\u2019s'),
        ("Ontitled's", "[Ontitled]'s"),
        # Logo / display names
        ('"Ontitled"', '"[Ontitled]"'),
        ('`Ontitled`', '`[Ontitled]`'),
        ('&quot;Ontitled&quot;', '&quot;[Ontitled]&quot;'),
        ('>Ontitled<', '>[Ontitled]<'),
        # Standalone Ontitled at end of sentence or before punctuation
        ('Ontitled ', '[Ontitled] '),
        ('Ontitled.', '[Ontitled].'),
        ('Ontitled,', '[Ontitled],'),
        ('Ontitled/', '[Ontitled]/'),
        # Meet the Ontitled + Labs ecosystem
        ('Meet the Ontitled', 'Learn about [Ontitled]'),
        ('Labs ecosystem', 'ecosystem'),
    ]
    
    for old, new in replacements:
        text = text.replace(old, new)
    
    return text

total_changes = 0
for f in html_files + mjs_files + js_files + json_files:
    try:
        t = f.read_text(errors='ignore')
        new_t = replace_contra(t)
        if new_t != t:
            f.write_text(new_t)
            changes = sum(1 for a, b in zip(t.split('\n'), new_t.split('\n')) if a != b)
            total_changes += changes
            print(f'  {f.name}: {changes} lines changed')
    except Exception as e:
        print(f'  {f.name}: ERROR {e}')

print(f'\nTotal: {total_changes} lines changed')
