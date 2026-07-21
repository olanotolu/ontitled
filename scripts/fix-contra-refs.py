#!/usr/bin/env python3
"""Replace all visible 'Contra' references with '[Ontitled]' in HTML and JS files."""
import re
from pathlib import Path

# Files to process
html_files = [Path('public/home.html'), Path('public/themis.html')]
mjs_files = list(Path('public/contra-assets').glob('*.mjs'))
js_files = list(Path('public/contra-assets').glob('*.js'))
json_files = list(Path('public/contra-assets').glob('*.json'))

# Skip patterns - don't replace these
skip_patterns = ['contra-assets', 'contralabs', 'contra.com', 'contrahq', 
                 'contra-asset', 'ContraLabs', 'contralabs_ai', 'contra-assets/']

def should_skip(ctx):
    for p in skip_patterns:
        if p in ctx:
            return True
    return False

def replace_contra(text):
    # Replace visible "Contra" text but not URLs or identifiers
    # Pattern: Contra followed by space, apostrophe, quote, or end of word
    # But not part of contralabs, contra.com, etc.
    
    replacements = [
        # Specific phrases
        ('What is Contra Pro?', 'What is [Ontitled] Pro?'),
        ('Contra Pro is currently', '[Ontitled] Pro is currently'),
        ('Contra Pro', '[Ontitled] Pro'),
        ('Contra is setting', '[Ontitled] is setting'),
        ('How does Contra help', 'How does [Ontitled] help'),
        ('Contra connects', '[Ontitled] connects'),
        ('Contra helps', '[Ontitled] helps'),
        ('Contra to evaluate', '[Ontitled] to evaluate'),
        ('Contra to train', '[Ontitled] to train'),
        ('Using Contra', 'Using [Ontitled]'),
        ('with Contra', 'with [Ontitled]'),
        ('on Contra', 'on [Ontitled]'),
        ('by Contra', 'by [Ontitled]'),
        ('trusted by Contra', 'trusted by [Ontitled]'),
        ('Run by Contra', 'Run by [Ontitled]'),
        # Apostrophe variants
        ('Contra\u2019s reviewers', '[Ontitled]\u2019s reviewers'),
        ("Contra's reviewers", "[Ontitled]'s reviewers"),
        ('Contra\u2019s', '[Ontitled]\u2019s'),
        ("Contra's", "[Ontitled]'s"),
        # Logo / display names
        ('"Contra"', '"[Ontitled]"'),
        ('`Contra`', '`[Ontitled]`'),
        ('&quot;Contra&quot;', '&quot;[Ontitled]&quot;'),
        ('>Contra<', '>[Ontitled]<'),
        # Standalone Contra at end of sentence or before punctuation
        ('Contra ', '[Ontitled] '),
        ('Contra.', '[Ontitled].'),
        ('Contra,', '[Ontitled],'),
        ('Contra/', '[Ontitled]/'),
        # Meet the Contra + Labs ecosystem
        ('Meet the Contra', 'Learn about [Ontitled]'),
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
