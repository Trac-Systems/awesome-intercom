# updated
# Seed Phrase Checker - Python Wordlist Tool
# Built on IntercomSwap - Trac Network

import json
import re
from typing import List, Dict, Tuple

# BIP39 Wordlist (First 200 words)
BIP39_WORDLIST = [
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
    "aware", "away", "awesome", "awful", "awkward", "axis", "baby", "balance",
    "bamboo", "banana", "banner", "bar", "barely", "bargain", "barrel",
    "base", "basic", "basket", "battle", "beach", "bean", "beauty", "because",
    "become", "beef", "before", "begin", "behave", "behind", "believe",
    "below", "belt", "bench", "benefit", "best", "betray", "better", "between",
    "beyond", "bicycle", "bid", "bike", "bind", "biology", "bird", "birth",
    "bitter", "black", "blade", "blame", "blanket", "blast", "bleak",
    "bless", "blind", "blood", "blossom", "blouse", "blue", "blur", "blush",
    "board", "boat", "body", "boil", "bomb", "bone", "book", "boost",
    "border", "boring", "borrow", "boss", "bottom", "bounce", "box", "boy"
]

OBVIOUS_WORDS = [
    'password', 'crypto', 'bitcoin', 'wallet', 'trac',
    'secret', 'hello', 'test', 'admin', 'user',
    'login', 'access', 'key', 'pass', 'qwerty',
    'letmein', 'welcome', 'monkey'
]

VALID_COUNTS = [12, 18, 24]


def is_valid_bip39_word(word: str) -> bool:
    return word.lower() in BIP39_WORDLIST


def get_invalid_words(words: List[str]) -> List[str]:
    return [w for w in words if not is_valid_bip39_word(w)]


def get_valid_words(words: List[str]) -> List[str]:
    return [w for w in words if is_valid_bip39_word(w)]


def check_word_count(words: List[str]) -> Dict:
    count = len(words)
    if count in VALID_COUNTS:
        return {
            'status': 'pass',
            'message': f'✅ Word count is {count} — Valid!',
            'score': 30
        }
    elif count < 12:
        return {
            'status': 'fail',
            'message': f'❌ Only {count} words — Need at least 12!',
            'score': 0
        }
    return {
        'status': 'warn',
        'message': f'⚠️ {count} words — Use 12, 18, or 24',
        'score': 10
    }


def check_duplicates(words: List[str]) -> Dict:
    if len(set(words)) == len(words):
        return {
            'status': 'pass',
            'message': '✅ No duplicate words found — Good!',
            'score': 25
        }
    return {
        'status': 'fail',
        'message': '❌ Duplicate words detected — Weak phrase!',
        'score': 0
    }


def check_numbers(words: List[str]) -> Dict:
    if not any(re.search(r'\d', w) for w in words):
        return {
            'status': 'pass',
            'message': '✅ No numbers found — Correct format!',
            'score': 20
        }
    return {
        'status': 'fail',
        'message': '❌ Numbers found — Use words only!',
        'score': 0
    }


def check_lowercase(words: List[str]) -> Dict:
    if all(w == w.lower() for w in words):
        return {
            'status': 'pass',
            'message': '✅ All words are lowercase — Correct!',
            'score': 10
        }
    return {
        'status': 'warn',
        'message': '⚠️ Some words have capitals — Use lowercase!',
        'score': 5
    }


def check_obvious_words(words: List[str]) -> Dict:
    found = [w for w in words if w in OBVIOUS_WORDS]
    if not found:
        return {
            'status': 'pass',
            'message': '✅ No obvious weak words detected — Good!',
            'score': 15
        }
    return {
        'status': 'fail',
        'message': f'❌ Weak words found: {", ".join(found)}',
        'score': 0
    }


def check_bip39_words(words: List[str]) -> Dict:
    invalid = get_invalid_words(words)
    if not invalid:
        return {
            'status': 'pass',
            'message': '✅ All words are valid BIP39 words!',
            'score': 10
        }
    return {
        'status': 'warn',
        'message': f'⚠️ Non-BIP39 words: {", ".join(invalid[:3])}',
        'score': 5
    }


def get_strength(score: int) -> str:
    if score >= 80:
        return 'STRONG'
    elif score >= 50:
        return 'MEDIUM'
    return 'WEAK'


def analyze_phrase(phrase: str) -> Dict:
    words = phrase.strip().lower().split()
    checks = [
        check_word_count(words),
        check_duplicates(words),
        check_numbers(words),
        check_lowercase(words),
        check_obvious_words(words),
        check_bip39_words(words)
    ]
    score = sum(c['score'] for c in checks)
    strength = get_strength(score)
    return {
        'words': words,
        'word_count': len(words),
        'score': score,
        'strength': strength,
        'is_valid': strength != 'WEAK',
        'checks': checks
    }


def print_report(report: Dict) -> None:
    print()
    print('=' * 40)
    print('  SEED PHRASE ANALYSIS REPORT')
    print('  Built on IntercomSwap - Trac Network')
    print('=' * 40)
    print(f"  Word Count : {report['word_count']}")
    print(f"  Score      : {report['score']}/100")
    print(f"  Strength   : {report['strength']}")
    print(f"  Valid      : {report['is_valid']}")
    print('=' * 40)
    print()
    for check in report['checks']:
        print(f"  {check['message']}")
    print()
    print('=' * 40)


if __name__ == '__main__':
    print('=' * 40)
    print('  Seed Phrase Checker - Python Tool')
    print('  Built on IntercomSwap - Trac Network')
    print('=' * 40)
    print()

    while True:
        try:
            phrase = input('Enter your seed phrase: ')
            if not phrase.strip():
                print('Please enter a seed phrase!')
                continue
            report = analyze_phrase(phrase)
            print_report(report)
            print(json.dumps(report, indent=2))
        except KeyboardInterrupt:
            print()
            print('Goodbye! Stay SAFU! 🔐')
            break
