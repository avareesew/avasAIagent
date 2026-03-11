import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.resolve(__dirname, '../../docs');

export async function loadDocuments() {
  const files = (await readdir(DOCS_DIR)).filter(f => f.endsWith('.md') || f.endsWith('.txt'));

  logger.info('Loading RAG documents', { count: files.length, files });

  const allDocs = [];
  for (const file of files) {
    const loader = new TextLoader(path.join(DOCS_DIR, file));
    const docs = await loader.load();
    // Attach clean filename as source metadata
    docs.forEach(doc => { doc.metadata.source = file; });
    allDocs.push(...docs);
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,
    chunkOverlap: 60,
  });

  const chunks = await splitter.splitDocuments(allDocs);
  logger.info('RAG documents split into chunks', { chunks: chunks.length });
  return chunks;
}
