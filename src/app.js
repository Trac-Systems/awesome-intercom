// Seed Phrase Checker - Frontend App Logic
// Built on IntercomSwap - Trac Network

const OBVIOUS_WORDS = [
  'password', 'crypto', 'bitcoin', 'wallet', 'trac',
  'secret', 'hello', 'test', 'admin', 'user',
  'login', 'access', 'key', 'pass', 'qwerty',
  'letmein', 'welcome', 'monkey'
];

const BIP39_WORDS = [
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
];

// Analysis Functions
function analyzePhrase(phrase) {
  const words = phrase.trim().toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const checks = [];
  let score = 0;

  // Word count check
  if ([12, 18, 24].includes(words.length)) {
    checks.push({ status: 'pass', text: `✅ Word count is ${words.length} — Valid!` });
    score += 30;
  } else if (words.length < 12) {
    checks.push({ status: 'fail', text: `❌ Only ${words.length} words — Need at least 12!` });
  } else {
    checks.push({ status: 'warn', text: `⚠️ ${words.length} words — Use 12, 18, or 24` });
    score += 10;
  }

  // Duplicates check
  const unique = new Set(words);
  if (unique.size === words.length) {
    checks.push({ status: 'pass', text: '✅ No duplicate words found — Good!' });
    score += 25;
  } else {
    checks.push({ status: 'fail', text: '❌ Duplicate words detected — Weak phrase!' });
  }

  // Numbers check
  if (!words.some(w => /\d/.test(w))) {
    checks.push({ status: 'pass', text: '✅ No numbers found — Correct format!' });
    score += 20;
  } else {
    checks.push({ status: 'fail', text: '❌ Numbers found — Use words only!' });
  }

  // Lowercase check
  if (words.every(w => w === w.toLowerCase())) {
    checks.push({ status: 'pass', text: '✅ All words are lowercase — Correct!' });
    score += 10;
  } else {
    checks.push({ status: 'warn', text: '⚠️ Some words have capitals — Use lowercase!' });
  }

  // Obvious words check
  const found = words.filter(w => OBVIOUS_WORDS.includes(w));
  if (found.length === 0) {
    checks.push({ status: 'pass', text: '✅ No obvious weak words detected — Good!' });
    score += 15;
  } else {
    checks.push({ status: 'fail', text: `❌ Weak words found: ${found.join(', ')}` });
  }

  // BIP39 check
  const invalid = words.filter(w => !BIP39_WORDS.includes(w));
  if (invalid.length === 0) {
    checks.push({ status: 'pass', text: '✅ All words are valid BIP39 words!' });
    score += 10;
  } else {
    checks.push({ status: 'warn', text: `⚠️ Non-BIP39 words: ${invalid.slice(0, 3).join(', ')}` });
  }

  return { words, score, checks };
}

// UI Functions
function checkSeedPhrase() {
  const input = document.getElementById('seedInput').value;
  if (!input.trim()) {
    alert('Please enter a seed phrase first!');
    return;
  }

  const { score, checks } = analyzePhrase(input);
  const results = document.getElementById('results');
  const checkList = document.getElementById('checkList');
  const scoreBox = document.getElementById('scoreBox');
  const scoreLabel = document.getElementById('scoreLabel');
  const scoreNumber = document.getElementById('scoreNumber');
  const scoreText = document.getElementById('scoreText');

  checkList.innerHTML = '';

  let strength, cls, text;
  if (score >= 80) {
    strength = 'STRONG 💪';
    cls = 'strong';
    text = 'Your seed phrase looks secure!';
  } else if (score >= 50) {
    strength = 'MEDIUM ⚠️';
    cls = 'medium';
    text = 'Could be stronger. Review checks below.';
  } else {
    strength = 'WEAK ❌';
    cls = 'weak';
    text = 'Serious issues found. Do not use this phrase!';
  }

  scoreBox.className = `score-box ${cls}`;
  scoreLabel.className = `score-label ${cls}`;
  scoreNumber.className = `score-number ${cls}`;
  scoreLabel.textContent = strength;
  scoreNumber.textContent = score;
  scoreText.textContent = text;

  checks.forEach(c => {
    const li = document.createElement('li');
    li.className = `checks ${c.status}`;
    li.textContent = c.text;
    checkList.appendChild(li);
  });

  results.style.display = 'block';
}

function clearAll() {
  document.getElementById('seedInput').value = '';
  document.getElementById('results').style.display = 'none';
}

function copyAddress() {
  const address = 'trac1q5r79wn6lc4p3x4desyjw8rna0ml6pakz873vt7r9ary7qlwvgdqwx24d0';
  navigator.clipboard.writeText(address).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = '✅ COPIED!';
    setTimeout(() => btn.textContent = 'COPY', 2000);
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  console.log('Seed Phrase Checker loaded');
  console.log('Built on IntercomSwap - Trac Network');
});
