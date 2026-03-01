// updated
// Seed Phrase Checker - Server
// Built on IntercomSwap - Trac Network

import express, { Request, Response } from 'express';
import path from 'path';
import { analyzePhrase } from './src/checker';
import { SeedPhraseReport } from './src/types';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/check', (req: Request, res: Response) => {
  try {
    const { phrase } = req.body;

    if (!phrase || typeof phrase !== 'string') {
      return res.status(400).json({
        error: 'Invalid request — phrase is required'
      });
    }

    if (phrase.trim().length === 0) {
      return res.status(400).json({
        error: 'Phrase cannot be empty'
      });
    }

    const report: SeedPhraseReport = analyzePhrase(phrase);

    return res.json({
      success: true,
      report
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'Seed Phrase Checker',
    version: '1.0.0',
    network: 'Trac Network',
    built_on: 'IntercomSwap',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('==================================');
  console.log('  Seed Phrase Checker');
  console.log('  Built on IntercomSwap');
  console.log('  Trac Network');
  console.log('==================================');
  console.log(`🚀 Running on http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api/health`);
  console.log('==================================');
});

export default app;
