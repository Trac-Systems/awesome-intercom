// updated
// Seed Phrase Checker - Tests
// Built on IntercomSwap - Trac Network

import {
  checkWordCount,
  checkDuplicates,
  checkNumbers,
  checkLowercase,
  checkObviousWords,
  checkBIP39Words,
  calculateScore,
  getStrength,
  analyzePhrase
} from '../src/checker';

let passed: number = 0;
let failed: number = 0;

function test(name: string, condition: boolean): void {
  if (condition) {
    console.log(`✅ PASS: ${name}`);
    passed++;
  } else {
    console.log(`❌ FAIL: ${name}`);
    failed++;
  }
}

console.log('');
console.log('================================');
console.log('  Seed Phrase Checker Tests');
console.log('  Built on IntercomSwap - Trac');
console.log('================================');
console.log('');

// Word Count Tests
console.log('--- Word Count Tests ---');
test('12 words is valid',
  checkWordCount('a b c d e f g h i j k l'.split(' ')).status === 'pass');
test('18 words is valid',
  checkWordCount('a b c d e f g h i j k l m n o p q r'.split(' ')).status === 'pass');
test('24 words is valid',
  checkWordCount('a b c d e f g h i j k l m n o p q r s t u v w x'.split(' ')).status === 'pass');
test('5 words is invalid',
  checkWordCount('a b c d e'.split(' ')).status === 'fail');
test('12 words gives score 30',
  checkWordCount('a b c d e f g h i j k l'.split(' ')).score === 30);

// Duplicate Tests
console.log('');
console.log('--- Duplicate Tests ---');
test('No duplicates passes',
  checkDuplicates(['apple', 'banana', 'cherry']).status === 'pass');
test('Duplicates detected',
  checkDuplicates(['apple', 'apple', 'cherry']).status === 'fail');
test('No duplicates gives score 25',
  checkDuplicates(['apple', 'banana']).score === 25);

// Number Tests
console.log('');
console.log('--- Number Tests ---');
test('No numbers passes',
  checkNumbers(['apple', 'banana']).status === 'pass');
test('Numbers detected',
  checkNumbers(['apple', '123']).status === 'fail');
test('No numbers gives score 20',
  checkNumbers(['apple', 'banana']).score === 20);

// Lowercase Tests
console.log('');
console.log('--- Lowercase Tests ---');
test('All lowercase passes',
  checkLowercase(['apple', 'banana']).status === 'pass');
test('Capitals detected',
  checkLowercase(['Apple', 'banana']).status === 'warn');
test('All lowercase gives score 10',
  checkLowercase(['apple', 'banana']).score === 10);

// Obvious Words Tests
console.log('');
console.log('--- Obvious Words Tests ---');
test('No obvious words passes',
  checkObviousWords(['abandon', 'ability']).status === 'pass');
test('Password detected',
  checkObviousWords(['password', 'ability']).status === 'fail');
test('No obvious words gives score 15',
  checkObviousWords(['abandon', 'ability']).score === 15);

// BIP39 Tests
console.log('');
console.log('--- BIP39 Tests ---');
test('Valid BIP39 words pass',
  checkBIP39Words(['abandon', 'ability']).status === 'pass');
test('Invalid BIP39 words warned',
  checkBIP39Words(['xyz123', 'abc456']).status === 'warn');

// Strength Tests
console.log('');
console.log('--- Strength Tests ---');
test('Score 100 is STRONG', getStrength(100) === 'STRONG');
test('Score 80 is STRONG', getStrength(80) === 'STRONG');
test('Score 60 is MEDIUM', getStrength(60) === 'MEDIUM');
test('Score 50 is MEDIUM', getStrength(50) === 'MEDIUM');
test('Score 30 is WEAK', getStrength(30) === 'WEAK');

// Full Analysis Test
console.log('');
console.log('--- Full Analysis Tests ---');
const strongPhrase = 'abandon ability able about above absent absorb abstract absurd abuse access accident';
const report = analyzePhrase(strongPhrase);
test('Strong phrase detected', report.strength === 'STRONG');
test('Word count is 12', report.wordCount === 12);
test('Report has checks', report.checks.length > 0);
test('Report has timestamp', report.timestamp.length > 0);
test('Strong phrase is valid', report.isValid === true);

const weakPhrase = 'password bitcoin';
const weakReport = analyzePhrase(weakPhrase);
test('Weak phrase detected', weakReport.strength === 'WEAK');
test('Weak phrase is invalid', weakReport.isValid === false);

// Summary
console.log('');
console.log('================================');
console.log(`  ✅ Passed: ${passed}`);
console.log(`  ❌ Failed: ${failed}`);
console.log(`  Total: ${passed + failed}`);
console.log('================================');
console.log('');
