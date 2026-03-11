import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { evaluate } from 'mathjs';
import { logToolCall } from '../logger.js';

export const calculatorTool = tool(
  async ({ expression }) => {
    try {
      const result = evaluate(expression);
      logToolCall('calculator', { expression }, result);
      return String(result);
    } catch (err) {
      logToolCall('calculator', { expression }, `ERROR: ${err.message}`);
      return `Error evaluating expression: ${err.message}`;
    }
  },
  {
    name: 'calculator',
    description:
      'Evaluates a math expression. Use this for travel budget calculations: total trip costs, per-day spend, group splits, currency conversions, etc. Input must be a valid math expression like "420 + 95 * 7" or "1340 / 4".',
    schema: z.object({
      expression: z.string().describe('A valid math expression to evaluate, e.g. "420 + 95 * 7"'),
    }),
  }
);
