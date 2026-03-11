import 'dotenv/config';
import logger from '../src/logger.js';
import { searchTool } from '../src/tools/search.js';

logger.info('--- Tavily Search Tool Test ---');

const result = await searchTool.invoke({ query: 'budget travel tips Europe 2026' });

logger.info('Search result received', { length: result.length });
console.log('\nRaw result:\n', result);
