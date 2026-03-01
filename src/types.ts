// updated
// Seed Phrase Checker - TypeScript Types
// Built on IntercomSwap - Trac Network

export type StrengthLevel = 'WEAK' | 'MEDIUM' | 'STRONG';

export type CheckStatus = 'pass' | 'fail' | 'warn';

export interface CheckResult {
  status: CheckStatus;
  message: string;
  score: number;
}

export interface SeedPhraseReport {
  words: string[];
  wordCount: number;
  score: number;
  strength: StrengthLevel;
  checks: CheckResult[];
  isValid: boolean;
  timestamp: string;
}

export interface CheckerConfig {
  minWords: number;
  maxWords: number;
  validCounts: number[];
  obviousWords: string[];
}

export interface ScoreBreakdown {
  wordCount: number;
  uniqueness: number;
  noNumbers: number;
  lowercase: number;
  noObviousWords: number;
  total: number;
}
