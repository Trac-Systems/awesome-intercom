# Seed Phrase Checker - Wordlist Generator
# Built on IntercomSwap - Trac Network

import json
import os
from typing import List, Dict


def generate_wordlist_json(words: List[str], output_path: str) -> None:
    """Generate a JSON file from wordlist"""
    data = {
        "name": "BIP39 Wordlist",
        "version": "1.0.0",
        "network": "Trac Network",
        "built_on": "IntercomSwap",
        "total_words": len(words),
        "words": words
    }
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"✅ Generated {output_path} with {len(words)} words")


def generate_wordlist_ts(words: List[str], output_path: str) -> None:
    """Generate a TypeScript file from wordlist"""
    lines = [
        "// Auto-generated BIP39 Wordlist",
        "// Built on IntercomSwap - Trac Network",
        "",
        "export const BIP39_WORDLIST: string[] = [",
    ]
    for i in range(0, len(words), 7):
        chunk = words[i:i+7]
        line = "  " + ", ".join(f'"{w}"' for w in chunk) + ","
        lines.append(line)
    lines.append("];")
    lines.append("")
    lines.append("export default BIP39_WORDLIST;")

    with open(output_path, 'w') as f:
        f.write('\n'.join(lines))
    print(f"✅ Generated {output_path} with {len(words)} words")


def generate_wordlist_rust(words: List[str], output_path: str) -> None:
    """Generate a Rust file from wordlist"""
    lines = [
        "// Auto-generated BIP39 Wordlist",
        "// Built on IntercomSwap - Trac Network",
        "",
        f"pub const BIP39_WORDLIST: [&str; {len(words)}] = [",
    ]
    for i in range(0, len(words), 5):
        chunk = words[i:i+5]
        line = "    " + ", ".join(f'"{w}"' for w in chunk) + ","
        lines.append(line)
    lines.append("];")

    with open(output_path, 'w') as f:
        f.write('\n'.join(lines))
    print(f"✅ Generated {output_path} with {len(words)} words")


def validate_wordlist(words: List[str]) -> Dict:
    """Validate the wordlist for quality"""
    issues = []
    if len(words) < 100:
        issues.append(f"⚠️ Only {len(words)} words — BIP39 needs 2048")
    duplicates = [w for w in words if words.count(w) > 1]
    if duplicates:
        issues.append(f"❌ Duplicates found: {set(duplicates)}")
    non_alpha = [w for w in words if not w.isalpha()]
    if non_alpha:
        issues.append(f"❌ Non-alpha words: {non_alpha[:5]}")
    uppercase = [w for w in words if w != w.lower()]
    if uppercase:
        issues.append(f"❌ Uppercase words: {uppercase[:5]}")
    return {
        'total': len(words),
        'valid': len(issues) == 0,
        'issues': issues
    }


def print_stats(words: List[str]) -> None:
    """Print wordlist statistics"""
    validation = validate_wordlist(words)
    print()
    print('=' * 40)
    print('  WORDLIST STATISTICS')
    print('  Built on IntercomSwap - Trac Network')
    print('=' * 40)
    print(f"  Total Words  : {validation['total']}")
    print(f"  Valid        : {validation['valid']}")
    avg_len = sum(len(w) for w in words) / len(words)
    print(f"  Avg Length   : {avg_len:.1f} chars")
    print(f"  Min Length   : {min(len(w) for w in words)}")
    print(f"  Max Length   : {max(len(w) for w in words)}")
    print('=' * 40)
    if validation['issues']:
        print('  ISSUES:')
        for issue in validation['issues']:
            print(f"  {issue}")
    else:
        print('  ✅ No issues found!')
    print('=' * 40)
    print()


# Sample BIP39 words
SAMPLE_WORDS = [
    "abandon", "ability", "able", "about", "above", "absent", "absorb",
    "abstract", "absurd", "abuse", "access", "accident", "account", "accuse",
    "achieve", "acid", "acoustic", "acquire", "across", "act", "action",
    "actor", "actress", "actual", "adapt", "add", "addict", "address",
    "adjust", "admit", "adult", "advance", "advice", "aerobic", "afford",
    "afraid", "again", "age", "agent", "agree", "ahead", "aim", "air",
    "airport", "aisle", "alarm", "album", "alcohol", "alert", "alien",
    "all", "alley", "allow", "almost", "alone", "alpha", "already", "also",
    "alter", "always", "amateur", "amazing", "among", "amount", "amused",
    "analyst", "anchor", "ancient", "anger", "angle", "angry", "animal",
    "ankle", "announce", "annual", "another", "answer", "antenna", "antique",
    "anxiety", "any", "apart", "apology", "appear", "apple", "approve",
    "april", "arch", "arctic", "area", "arena", "argue", "arm", "armed",
    "armor", "army", "around", "arrange", "arrest", "arrive", "arrow",
    "art", "artefact", "artist", "artwork", "ask", "aspect", "assault",
    "asset", "assist", "assume", "asthma", "athlete", "atom", "attack",
    "attend", "attitude", "attract", "auction", "audit", "august", "aunt",
    "author", "auto", "autumn", "average", "avocado", "avoid", "awake",
    "aware", "away", "awesome", "awful", "awkward", "axis"
]


if __name__ == '__main__':
    print('=' * 40)
    print('  Wordlist Generator')
    print('  Built on IntercomSwap - Trac Network')
    print('=' * 40)

    # Print stats
    print_stats(SAMPLE_WORDS)

    # Create output directory
    os.makedirs('output', exist_ok=True)

    # Generate files
    generate_wordlist_json(SAMPLE_WORDS, 'output/wordlist.json')
    generate_wordlist_ts(SAMPLE_WORDS, 'output/wordlist.ts')
    generate_wordlist_rust(SAMPLE_WORDS, 'output/wordlist.rs')

    print()
    print('✅ All wordlist files generated in output/ folder!')
    print('🔐 Built on IntercomSwap - Trac Network')
