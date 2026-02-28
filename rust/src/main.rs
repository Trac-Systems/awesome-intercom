// Seed Phrase Checker - Rust Validation Engine
// Built on IntercomSwap - Trac Network

use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use std::io::{self, BufRead};

#[derive(Debug, Serialize, Deserialize)]
pub struct CheckResult {
    pub status: String,
    pub message: String,
    pub score: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SeedPhraseReport {
    pub word_count: usize,
    pub score: u32,
    pub strength: String,
    pub is_valid: bool,
    pub checks: Vec<CheckResult>,
}

const VALID_COUNTS: [usize; 3] = [12, 18, 24];

const OBVIOUS_WORDS: [&str; 18] = [
    "password", "crypto", "bitcoin", "wallet",
    "trac", "secret", "hello", "test", "admin",
    "user", "login", "access", "key", "pass",
    "qwerty", "letmein", "welcome", "monkey",
];

const BIP39_WORDS: [&str; 100] = [
    "abandon", "ability", "able", "about", "above",
    "absent", "absorb", "abstract", "absurd", "abuse",
    "access", "accident", "account", "accuse", "achieve",
    "acid", "acoustic", "acquire", "across", "act",
    "action", "actor", "actress", "actual", "adapt",
    "add", "addict", "address", "adjust", "admit",
    "adult", "advance", "advice", "aerobic", "afford",
    "afraid", "again", "age", "agent", "agree",
    "ahead", "aim", "air", "airport", "aisle",
    "alarm", "album", "alcohol", "alert", "alien",
    "all", "alley", "allow", "almost", "alone",
    "alpha", "already", "also", "alter", "always",
    "amateur", "amazing", "among", "amount", "amused",
    "analyst", "anchor", "ancient", "anger", "angle",
    "angry", "animal", "ankle", "announce", "annual",
    "another", "answer", "antenna", "antique", "anxiety",
    "any", "apart", "apology", "appear", "apple",
    "approve", "april", "arch", "arctic", "area",
    "arena", "argue", "arm", "armed", "armor",
    "army", "around", "arrange", "arrest", "arrive",
];

pub fn check_word_count(words: &[&str]) -> CheckResult {
    let count = words.len();
    if VALID_COUNTS.contains(&count) {
        CheckResult {
            status: "pass".to_string(),
            message: format!("✅ Word count is {} — Valid!", count),
            score: 30,
        }
    } else if count < 12 {
        CheckResult {
            status: "fail".to_string(),
            message: format!("❌ Only {} words — Need at least 12!", count),
            score: 0,
        }
    } else {
        CheckResult {
            status: "warn".to_string(),
            message: format!("⚠️ {} words — Use 12, 18, or 24", count),
            score: 10,
        }
    }
}

pub fn check_duplicates(words: &[&str]) -> CheckResult {
    let unique: HashSet<&str> = words.iter().cloned().collect();
    if unique.len() == words.len() {
        CheckResult {
            status: "pass".to_string(),
            message: "✅ No duplicate words found — Good!".to_string(),
            score: 25,
        }
    } else {
        CheckResult {
            status: "fail".to_string(),
            message: "❌ Duplicate words detected — Weak phrase!".to_string(),
            score: 0,
        }
    }
}

pub fn check_numbers(words: &[&str]) -> CheckResult {
    let has_numbers = words.iter().any(|w| w.chars().any(|c| c.is_numeric()));
    if !has_numbers {
        CheckResult {
            status: "pass".to_string(),
            message: "✅ No numbers found — Correct format!".to_string(),
            score: 20,
        }
    } else {
        CheckResult {
            status: "fail".to_string(),
            message: "❌ Numbers found — Use words only!".to_string(),
            score: 0,
        }
    }
}

pub fn check_lowercase(words: &[&str]) -> CheckResult {
    let all_lower = words.iter().all(|w| w.chars().all(|c| c.is_lowercase()));
    if all_lower {
        CheckResult {
            status: "pass".to_string(),
            message: "✅ All words are lowercase — Correct!".to_string(),
            score: 10,
        }
    } else {
        CheckResult {
            status: "warn".to_string(),
            message: "⚠️ Some words have capitals — Use lowercase!".to_string(),
            score: 5,
        }
    }
}

pub fn check_obvious_words(words: &[&str]) -> CheckResult {
    let found: Vec<&str> = words
        .iter()
        .filter(|w| OBVIOUS_WORDS.contains(w))
        .cloned()
        .collect();
    if found.is_empty() {
        CheckResult {
            status: "pass".to_string(),
            message: "✅ No obvious weak words detected — Good!".to_string(),
            score: 15,
        }
    } else {
        CheckResult {
            status: "fail".to_string(),
            message: format!("❌ Weak words found: {}", found.join(", ")),
            score: 0,
        }
    }
}

pub fn check_bip39_words(words: &[&str]) -> CheckResult {
    let invalid: Vec<&str> = words
        .iter()
        .filter(|w| !BIP39_WORDS.contains(w))
        .cloned()
        .collect();
    if invalid.is_empty() {
        CheckResult {
            status: "pass".to_string(),
            message: "✅ All words are valid BIP39 words!".to_string(),
            score: 10,
        }
    } else {
        CheckResult {
            status: "warn".to_string(),
            message: format!(
                "⚠️ Non-BIP39 words: {}",
                invalid[..invalid.len().min(3)].join(", ")
            ),
            score: 5,
        }
    }
}

pub fn get_strength(score: u32) -> &'static str {
    if score >= 80 { "STRONG" }
    else if score >= 50 { "MEDIUM" }
    else { "WEAK" }
}

pub fn analyze_phrase(phrase: &str) -> SeedPhraseReport {
    let words: Vec<&str> = phrase
        .trim()
        .split_whitespace()
        .collect();

    let checks = vec![
        check_word_count(&words),
        check_duplicates(&words),
        check_numbers(&words),
        check_lowercase(&words),
        check_obvious_words(&words),
        check_bip39_words(&words),
    ];

    let score: u32 = checks.iter().map(|c| c.score).sum();
    let strength = get_strength(score).to_string();
    let is_valid = strength != "WEAK";

    SeedPhraseReport {
        word_count: words.len(),
        score,
        strength,
        is_valid,
        checks,
    }
}

fn main() {
    println!("==================================");
    println!("  Seed Phrase Checker - Rust Engine");
    println!("  Built on IntercomSwap - Trac Network");
    println!("==================================");
    println!();
    println!("Enter your seed phrase and press Enter:");
    println!();

    let stdin = io::stdin();
    for line in stdin.lock().lines() {
        let phrase = line.unwrap();
        if phrase.trim().is_empty() {
            println!("Please enter a seed phrase!");
            continue;
        }

        let report = analyze_phrase(&phrase);
        let json = serde_json::to_string_pretty(&report).unwrap();
        println!("{}", json);
        println!();
        println!("==================================");
        println!("  Score: {}/100", report.score);
        println!("  Strength: {}", report.strength);
        println!("  Valid: {}", report.is_valid);
        println!("==================================");
        println!();
        println!("Enter another phrase or Ctrl+C to exit:");
    }
}
