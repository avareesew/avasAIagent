import 'dotenv/config';
import logger from '../src/logger.js';
import { ragTool } from '../src/tools/rag.js';

logger.info('--- RAG Tool Test (stub) ---');

const result = await ragTool.invoke({ query: 'What should I budget for food per day in Thailand?' });

logger.info('RAG stub result', { result });
