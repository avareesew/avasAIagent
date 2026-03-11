import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { getVectorStore } from '../rag/vectorstore.js';
import { logToolCall } from '../logger.js';

export const ragTool = tool(
  async ({ query }) => {
    const vectorStore = await getVectorStore();
    const docs = await vectorStore.similaritySearch(query, 3);

    if (docs.length === 0) {
      const result = 'No relevant information found in the travel knowledge base.';
      logToolCall('rag_search', { query }, result);
      return result;
    }

    // Format results with source attribution — required by rubric
    const result = docs
      .map(doc => `[Source: ${doc.metadata.source}]\n${doc.pageContent}`)
      .join('\n\n---\n\n');

    logToolCall('rag_search', { query }, `${docs.length} chunks from: ${[...new Set(docs.map(d => d.metadata.source))].join(', ')}`);
    return result;
  },
  {
    name: 'rag_search',
    description:
      'Searches the internal travel knowledge base for destination guides, budgeting frameworks, packing checklists, and travel safety tips. Always includes the source document name in the response. Use this before web_search for general travel knowledge questions.',
    schema: z.object({
      query: z.string().describe('The question to search the travel knowledge base for'),
    }),
  }
);
