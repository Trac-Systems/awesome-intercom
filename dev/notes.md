<!-- updated -->
# Developer Notes
Built on IntercomSwap - Trac Network

## Project Overview
Seed Phrase Checker is a TRAC-themed web app that checks
the strength and security of crypto wallet seed phrases.
100% local - nothing is ever sent to any server.

## Architecture
- Frontend: Pure HTML/CSS/JS (index.html)
- Backend: Node.js + Express (server.js)
- Core Logic: src/checker.js
- Tests: test/test.js
- Run Script: scripts/run.sh

## How It Works
1. User enters seed phrase in browser
2. JavaScript checks the phrase locally
3. Results shown instantly in browser
4. Nothing sent to server ever

## Security Decisions
- All checks run in browser only
- No API calls made
- No database used
- No logging of seed phrases
- Auto-clear on page refresh

## Code Structure
index.html     — Main UI and frontend logic
server.js      — Express server (serves index.html)
src/checker.js — Core checking logic (reusable)
test/test.js   — Unit tests
scripts/run.sh — Easy run script

## Development Setup
npm install
npm start
open http://localhost:3000

## Testing
node test/test.js

## Built On
- IntercomSwap by Trac Systems
- Trac Network
- Node.js + Express

## Competition Entry
- Intercom Vibe Competition
- Category: IntercomSwap Fork
- Unique: First seed phrase checker on Trac Network
