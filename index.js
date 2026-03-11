import 'dotenv/config';
import logger from './src/logger.js';

logger.info('Travel & Budget Planner Agent starting...');

logger.info('Environment check', {
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? 'SET' : 'MISSING',
  TAVILY_API_KEY: process.env.TAVILY_API_KEY ? 'SET' : 'MISSING',
});

// Agent will be wired up in Phase 3
logger.info('Phase 1 complete — logger operational. Agent coming in Phase 3.');
