import 'dotenv/config';
import readline from 'readline';
import logger from './src/logger.js';
import { chat } from './src/agent.js';

logger.info('Travel & Budget Planner Agent starting...', {
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? 'SET' : 'MISSING',
  TAVILY_API_KEY: process.env.TAVILY_API_KEY ? 'SET' : 'MISSING',
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('\n========================================');
console.log('  Travel & Budget Planner AI Agent');
console.log('========================================');
console.log('Ask me about trip costs, destinations,');
console.log('visa requirements, packing tips, and more.');
console.log('Type "exit" to quit.\n');

function ask() {
  rl.question('You: ', async (input) => {
    const trimmed = input.trim();

    if (trimmed.toLowerCase() === 'exit') {
      console.log('\nGoodbye! Safe travels.');
      rl.close();
      return;
    }

    if (!trimmed) {
      ask();
      return;
    }

    try {
      const response = await chat(trimmed);
      console.log(`\nAgent: ${response}\n`);
    } catch (err) {
      logger.error('Agent error', { error: err.message });
      console.error(`\nError: ${err.message}\n`);
    }

    ask();
  });
}

ask();
