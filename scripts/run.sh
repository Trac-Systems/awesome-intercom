# updated
```
#!/bin/bash

# Seed Phrase Checker - Run Script
# Built on IntercomSwap - Trac Network

echo "=================================="
echo "  Seed Phrase Checker - Trac Network"
echo "  Built on IntercomSwap"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Dependencies ready"
echo ""
echo "🚀 Starting Seed Phrase Checker..."
echo "🌐 Open browser at: http://localhost:3000"
echo ""

# Start the server
npm start
