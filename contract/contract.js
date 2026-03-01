// updated
```
// Seed Phrase Checker - Validation Contract Rules
// Built on IntercomSwap - Trac Network

'use strict';

const CONTRACT_VERSION = '1.0.0';
const NETWORK = 'Trac Network';
const BUILT_ON = 'IntercomSwap';

// Validation Rules Contract
const VALIDATION_RULES = {
  wordCount: {
    valid: [12, 18, 24],
    minWords: 12,
    maxWords: 24,
    score: 30
  },
  duplicates: {
    allowDuplicates: false,
    score: 25
  },
  numbers: {
    allowNumbers: false,
    score: 20
  },
  lowercase: {
    requireLowercase: true,
    score: 10
  },
  obviousWords: {
    score: 15,
    blacklist: [
      'password', 'crypto', 'bitcoin', 'wallet',
      'trac', 'secret', 'hello', 'test', 'admin',
      'user', 'login', 'access', 'key', 'pass',
      'qwerty', 'letmein', 'welcome', 'monkey'
    ]
  },
  bip39: {
    score: 10,
    enforced: true
  }
};

// Strength Thresholds
const STRENGTH_THRESHOLDS = {
  STRONG: 80,
  MEDIUM: 50,
  WEAK: 0
};

// Contract Methods
function getValidationRules() {
  return VALIDATION_RULES;
}

function getStrengthThresholds() {
  return STRENGTH_THRESHOLDS;
}

function getContractInfo() {
  return {
    version: CONTRACT_VERSION,
    network: NETWORK,
    builtOn: BUILT_ON,
    totalScore: Object.values(VALIDATION_RULES)
      .reduce((sum, rule) => sum + (rule.score || 0), 0)
  };
}

function validateScore(score) {
  if (score >= STRENGTH_THRESHOLDS.STRONG) return 'STRONG';
  if (score >= STRENGTH_THRESHOLDS.MEDIUM) return 'MEDIUM';
  return 'WEAK';
}

function isBlacklisted(word) {
  return VALIDATION_RULES.obviousWords.blacklist.includes(
    word.toLowerCase()
  );
}

function isValidWordCount(count) {
  return VALIDATION_RULES.wordCount.valid.includes(count);
}

module.exports = {
  getValidationRules,
  getStrengthThresholds,
  getContractInfo,
  validateScore,
  isBlacklisted,
  isValidWordCount,
  VALIDATION_RULES,
  STRENGTH_THRESHOLDS,
  CONTRACT_VERSION,
  NETWORK,
  BUILT_ON
};
```
