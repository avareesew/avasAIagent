import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { logToolCall } from '../logger.js';

// Phase 4 will replace this stub with a full vector search implementation
// using HuggingFace embeddings over the docs/ travel document library.
export const ragTool = tool(
  async ({ query }) => {
    const result = '[RAG STUB] Full implementation coming in Phase 4. Source: placeholder.md';
    logToolCall('rag_search', { query }, result);
    return result;
  },
  {
    name: 'rag_search',
    description:
      'Searches the internal travel knowledge base for destination guides, budgeting frameworks, packing checklists, and travel safety tips. Always includes the source document name in the response.',
    schema: z.object({
      query: z.string().describe('The question to search the travel knowledge base for'),
    }),
  }
);
