import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { loadDocuments } from './loader.js';
import logger from '../logger.js';

let vectorStore = null;

export async function getVectorStore() {
  if (vectorStore) return vectorStore;

  logger.info('Initializing RAG vector store (first run downloads ~80MB model)...');

  const docs = await loadDocuments();

  const embeddings = new HuggingFaceTransformersEmbeddings({
    modelName: 'Xenova/all-MiniLM-L6-v2',
  });

  vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  logger.info('RAG vector store ready', { documents: docs.length });

  return vectorStore;
}
