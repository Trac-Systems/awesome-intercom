// updated
// Seed Phrase Checker - Core Logic
// Built on IntercomSwap - Trac Network

import {
  CheckResult,
  CheckerConfig,
  SeedPhraseReport,
  StrengthLevel,
  ScoreBreakdown
} from './types';

import { isValidBIP39Word, getInvalidWords } from './wordlist';

const DEFAULT_CONFIG: CheckerConfig = {
  minWords: 12,
  maxWords: 24,
  validCounts: [12, 18, 24],
  obviousWords: [
    'password', 'crypto', 'bitcoin', 'wallet',
    'trac', 'secret', 'hello', 'test', 'admin',
    'user', 'login', 'access', 'key', 'pass',
    'qwerty', 'letmein', 'welcome', 'monkey'
  ]
};

export function checkWordCount(
  words: string[],
  config: CheckerConfig = DEFAULT_CONFIG
): CheckResult {
  const count = words.length;
  if (config.validCounts.includes(count)) {
    return {
      status: 'pass',
      message: `✅ Word count is ${count} — Valid!`,
      score: 30
    };
  } else if (count < config.minWords) {
    return {
      status: 'fail',
      message: `❌ Only ${count} words — Need at least 12!`,
      score: 0
    };
  }
  return {
    status: 'warn',
    message: `⚠️ ${count} words — Use 12, 18, or 24`,
    score: 10
  };
}

export function checkDuplicates(words: string[]): CheckResult {
  const unique = new Set(words);
  if (unique.size === words.length) {
    return {
      status: 'pass',
      message: '✅ No duplicate words found — Good!',
      score: 25
    };
  }
  return {
    status: 'fail',
    message: '❌ Duplicate words detected — Weak phrase!',
    score: 0
  };
}

export function checkNumbers(words: string[]): CheckResult {
  const hasNumbers = words.some(w => /\d/.test(w));
  if (!hasNumbers) {
    return {
      status: 'pass',
      message: '✅ No numbers found — Correct format!',
      score: 20
    };
  }
  return {
    status: 'fail',
    message: '❌ Numbers found — Use words only!',
    score: 0
  };
}

export function checkLowercase(words: string[]): CheckResult {
  const allLower = words.every(w => w === w.toLowerCase());
  if (allLower) {
    return {
      status: 'pass',
      message: '✅ All words are lowercase — Correct!',
      score: 10
    };
  }
  return {
    status: 'warn',
    message: '⚠️ Some words have capitals — Use lowercase!',
    score: 5
  };
}

export function checkObviousWords(
  words: string[],
  config: CheckerConfig = DEFAULT_CONFIG
): CheckResult {
  const found = words.filter(w => config.obviousWords.includes(w));
  if (found.length === 0) {
    return {
      status: 'pass',
      message: '✅ No obvious weak words detected — Good!',
      score: 15
    };
  }
  return {
    status: 'fail',
    message: `❌ Weak words found: ${found.join(', ')}`,
    score: 0
  };
}

export function checkBIP39Words(words: string[]): CheckResult {
  const invalid = getInvalidWords(words);
  if (invalid.length === 0) {
    return {
      status: 'pass',
      message: '✅ All words are valid BIP39 words!',
      score: 10
    };
  }
  return {
    status: 'warn',
    message: `⚠️ Non-BIP39 words: ${invalid.slice(0, 3).join(', ')}`,
    score: 5
  };
}

export function calculateScore(checks: CheckResult[]): number {
  return checks.reduce((total, check) => total + check.score, 0);
}

export function getStrength(score: number): StrengthLevel {
  if (score >= 80) return 'STRONG';
  if (score >= 50) return 'MEDIUM';
  return 'WEAK';
}

export function analyzePhrase(
  phrase: string,
  config: CheckerConfig = DEFAULT_CONFIG
): SeedPhraseReport {
  const words = phrase.trim().toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const checks: CheckResult[] = [
    checkWordCount(words, config),
    checkDuplicates(words),
    checkNumbers(words),
    checkLowercase(words),
    checkObviousWords(words, config),
    checkBIP39Words(words)
  ];
  const score = calculateScore(checks);
  const strength = getStrength(score);
  return {
    words,
    wordCount: words.length,
    score,
    strength,
    checks,
    isValid: strength !== 'WEAK',
    timestamp: new Date().toISOString()
  };
}
