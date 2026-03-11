import { ChatAnthropic } from '@langchain/anthropic';
import { AgentExecutor, createToolCallingAgent } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { calculatorTool } from './tools/calculator.js';
import { searchTool } from './tools/search.js';
import { ragTool } from './tools/rag.js';
import logger from './logger.js';

const tools = [calculatorTool, searchTool, ragTool];

const model = new ChatAnthropic({
  model: 'claude-haiku-4-5-20251001',
  temperature: 0,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `You are a helpful Travel & Budget Planner AI agent. You help users plan trips, estimate costs, find travel information, and answer questions about destinations and travel logistics.

You have access to three tools:
- calculator: for math and budget calculations (trip totals, per-day spend, group splits)
- web_search: for real-time travel information (visa requirements, hotel prices, flight costs, travel seasons)
- rag_search: for curated internal travel guides and destination knowledge

Always use the most appropriate tool for the question. For math, always use the calculator rather than computing in your head.`,
  ],
  new MessagesPlaceholder('chat_history'),
  ['human', '{input}'],
  new MessagesPlaceholder('agent_scratchpad'),
]);

const agent = createToolCallingAgent({ llm: model, tools, prompt });

const agentExecutor = new AgentExecutor({ agent, tools, verbose: false });

// Manually managed history per session — avoids content block coercion issues with Claude 4
const sessionHistories = {};

function getHistory(sessionId) {
  if (!sessionHistories[sessionId]) sessionHistories[sessionId] = [];
  return sessionHistories[sessionId];
}

export async function chat(userMessage, sessionId = 'default') {
  logger.info('User input', { sessionId, message: userMessage });

  const history = getHistory(sessionId);

  const result = await agentExecutor.invoke({
    input: userMessage,
    chat_history: history,
  });

  // Claude 4 returns output as an array of content blocks — extract plain text
  let output = result.output;
  if (Array.isArray(output)) {
    output = output
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('');
  }

  // Store as proper BaseMessages so follow-up turns work correctly
  history.push(new HumanMessage(userMessage));
  history.push(new AIMessage(output));

  logger.info('Agent response', { sessionId, response: output });
  return output;
}
