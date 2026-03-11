import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './src/logger.js';
import { chat } from './src/agent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/chat', async (req, res) => {
  const { message, sessionId = 'web-default' } = req.body;

  if (!message?.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    logger.info('Web chat request', { sessionId, message });
    const response = await chat(message, sessionId);
    res.json({ response });
  } catch (err) {
    logger.error('Web chat error', { error: err.message });
    res.status(500).json({ error: 'Agent error: ' + err.message });
  }
});

app.listen(PORT, () => {
  logger.info(`Server running`, { url: `http://localhost:${PORT}` });
  console.log(`\nWeb UI: http://localhost:${PORT}\n`);
});
