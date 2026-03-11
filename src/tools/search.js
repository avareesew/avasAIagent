import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { logToolCall } from '../logger.js';

const tavily = new TavilySearchResults({ maxResults: 3 });

export const searchTool = tool(
  async ({ query }) => {
    const result = await tavily.invoke(query);
    logToolCall('web_search', { query }, result);
    return result;
  },
  {
    name: 'web_search',
    description:
      'Searches the web for real-time travel information. Use for visa requirements, hotel prices, flight costs, best travel seasons, destination overviews, travel advisories, and anything requiring up-to-date information.',
    schema: z.object({
      query: z.string().describe('The search query, e.g. "visa requirements for US citizens in Japan"'),
    }),
  }
);
