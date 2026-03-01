# 🔐 Seed Phrase Checker - Trac Network

A TRAC-themed Seed Phrase Strength Checker built on IntercomSwap.
Check your crypto wallet seed phrase security — 100% locally, nothing sent anywhere.

## 📸 Screenshots

### 🏠 Homepage
<img width="1856" height="837" alt="homepage" src="https://github.com/user-attachments/assets/01fe3351-e0d8-4726-bfdf-43a1caadeeeb" />

---

### 🧪 Testing Results
<img width="1845" height="822" alt="testing" src="https://github.com/user-attachments/assets/aa07ae9b-6a46-422d-9997-33803d43fe2c" />

---

## 🌐 Live Demo
👉 https://onihaxy.github.io/seed-phrase-checker-trac

---

## 🔗 Trac Address
```
trac1q5r79wn6lc4p3x4desyjw8rna0ml6pakz873vt7r9ary7qlwvgdqwx24d0
```
---

## ✨ Features
- 🔐 Checks seed phrase strength
- ✅ Validates word count (12, 18, 24 words)
- 🔍 Detects duplicate words
- ⚠️ Detects obvious/weak words
- 📊 Security score out of 100
- 🔎 BIP39 wordlist validation
- ⚡ 100% runs in browser — no data sent anywhere

---

## 🛠 Tech Stack
- **TypeScript** — Core checking logic
- **Rust** — Fast validation engine
- **Python** — Wordlist generation tools
- **JavaScript** — Frontend app logic
- **CSS** — Separate stylesheet
- **Node.js + Express** — Server

---

## 📁 Project Structure
```
seed-phrase-checker-trac/
├── screenshots
├── src/
│   ├── checker.ts
│   ├── types.ts
│   ├── wordlist.ts
│   └── app.js
├── rust/
│   ├── Cargo.toml
│   └── src/main.rs
├── python/
│   ├── wordlist.py
│   └── generate_wordlist.py
├── styles/
│   └── main.css
├── test/
│   └── test.ts
├── scripts/
│   └── run.sh
├── features/
│   └── roadmap.md
├── dev/
│   └── notes.md
├── index.html
├── server.ts
├── package.json
├── tsconfig.json
├── SKILL.md
├── LICENSE.md
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v22+
- npm v10+
- Rust 1.85+
- Python 3.14.3+ (optional)

### Installation
```bash
# Clone the repository
git clone https://github.com/Onihaxy/seed-phrase-checker-trac.git

# Navigate to project
cd seed-phrase-checker-trac

# Install dependencies
npm install

# Start the server
npm start
```

### Open In Browser
```
http://localhost:3000
```

---

## 🦀 Rust Validation Engine
```bash
# Navigate to rust directory
cd rust

# Build and run
cargo run
```

---

## 🐍 Python Wordlist Tools
```bash
# Navigate to python directory
cd python

# Run wordlist checker
python wordlist.py

# Generate wordlist files
python generate_wordlist.py
```

---

## 🧪 Testing
```bash
# Run all tests
npm test

# Expected output
# ✅ PASS: 12 words is valid
# ✅ PASS: No duplicates passes
# ✅ PASS: Strong phrase detected
```

---

## 🏆 Competition Entry
- Fork of: https://github.com/Trac-Systems/intercom-swap
- Built for: Intercom Vibe Competition
- Category: IntercomSwap Fork
- onihaxy seed phrase checker IntercomSwap fork
- [onihaxy/seed-phrase-checker-trac](https://github.com/onihaxy/seed-phrase-checker-trac) — A TRAC-themed Seed Phrase Strength Checker built on IntercomSwap. Check wallet security 100% locally.  
- Live Demo: https://onihaxy.github.io/seed-phrase-checker-trac

---

## 📄 License
MIT — Fork freely, build on top, win together.
