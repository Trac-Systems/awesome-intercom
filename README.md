# 🔐 Seed Phrase Checker - Trac Network

A TRAC-themed Seed Phrase Strength Checker built on IntercomSwap.
Check your crypto wallet seed phrase security — 100% locally, nothing sent anywhere.

![App Homepage](screenshots/homepage.png)
![App Results](screenshots/results.png)

---

## 🌐 Live Demo
👉 https://onihaxy.github.io/seed-phrase-checker-trac

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
├── src/
│   ├── checker.ts      ← Core TypeScript logic
│   ├── types.ts        ← TypeScript interfaces
│   ├── wordlist.ts     ← BIP39 wordlist
│   └── app.js          ← Frontend logic
├── rust/
│   ├── Cargo.toml      ← Rust config
│   └── src/main.rs     ← Rust validator
├── python/
│   ├── wordlist.py     ← Python wordlist tool
│   └── generate_wordlist.py ← Wordlist generator
├── styles/
│   └── main.css        ← Stylesheet
├── test/
│   └── test.ts         ← TypeScript tests
├── scripts/
│   └── run.sh          ← Run script
├── features/
│   └── roadmap.md      ← Feature roadmap
├── dev/
│   └── notes.md        ← Developer notes
├── screenshots/        ← App screenshots
├── index.html          ← Main UI
├── server.ts           ← TypeScript server
├── package.json        ← Dependencies
├── tsconfig.json       ← TypeScript config
├── SKILL.md            ← Agent skill file
├── LICENSE.md          ← MIT License
└── .gitignore
```

---

## 🚀 How To Run
```bash
npm install
npm start
```
Then open: http://localhost:3000

## 🦀 Run Rust Engine
```bash
cd rust
cargo run
```

## 🐍 Run Python Tools
```bash
cd python
python wordlist.py
python generate_wordlist.py
```

## 🧪 Run Tests
```bash
npm test
```

---

## 📸 Screenshots
![App Homepage](screenshots/homepage.png)
![App Results](screenshots/results.png)                
## 📄 License
MIT — Fork freely, build on top, win together.



---

## 🔗 Trac Address
```bash
`trac1q5r79wn6lc4p3x4desyjw8rna0ml6pakz873vt7r9ary7qlwvgdqwx24d0`

---
---
 ## 🏆 Competition Entry
- Fork of: https://github.com/Trac-Systems/intercom-swap
- Built for: Intercom Vibe Competition
- Category: IntercomSwap Fork

