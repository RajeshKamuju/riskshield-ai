import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'UP',
      service: 'RiskShield AI Decision Engine',
      version: 'v3.4.1-stable',
      timestamp: new Date().toISOString()
    });
  });

  // REST API: Evaluation Endpoint
  app.post('/api/risk/evaluate', (req, res) => {
    const { amount, txCount10m, isTorOrVpn, isNewDevice } = req.body;
    let score = 10;
    if (amount > 50000) score += 40;
    if (txCount10m > 4) score += 30;
    if (isTorOrVpn) score += 28;
    if (isNewDevice) score += 18;

    score = Math.min(99, score);
    const decision = score >= 80 ? 'BLOCK' : score >= 60 ? 'REVIEW' : score >= 35 ? 'MONITOR' : 'APPROVE';

    res.json({
      riskScore: score,
      decision,
      evaluationTimeMs: 12,
      timestamp: new Date().toISOString()
    });
  });

  // Serve static files from the vanilla frontend folder
  const frontendPath = path.join(process.cwd(), 'frontend');
  app.use(express.static(frontendPath));
  app.use('/frontend', express.static(frontendPath));

  // Fallback to frontend index for SPA routes
  app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(frontendPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RiskShield AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
