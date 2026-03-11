import 'dotenv/config';
import logger from '../src/logger.js';
import { calculatorTool } from '../src/tools/calculator.js';

logger.info('--- Calculator Tool Test ---');

const tests = [
  { expression: '420 + 95 * 7',  expected: '1085' },
  { expression: '1340 / 4',      expected: '335'  },
  { expression: '150 * 10 + 500', expected: '2000' },
];

for (const { expression, expected } of tests) {
  const result = await calculatorTool.invoke({ expression });
  const pass = String(result) === expected;
  logger.info(`${pass ? 'PASS' : 'FAIL'}: "${expression}" => ${result} (expected ${expected})`);
}
