import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import { initDb } from './init-db.js';
import { initMinIO } from './minio.js';
import podcastRoutes from './routes/podcasts.js';
import episodeRoutes from './routes/episodes.js';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = process.env.API_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/podcasts', podcastRoutes);
app.use('/api/episodes', episodeRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Initialize and start
async function start() {
  try {
    console.log('Initializing database...');
    await initDb();
    
    console.log('Initializing MinIO...');
    await initMinIO();
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();

export default app;
