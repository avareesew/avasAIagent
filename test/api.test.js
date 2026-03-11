import 'dotenv/config';
import { ChatAnthropic } from '@langchain/anthropic';

console.log('Testing direct Anthropic API call...');

const model = new ChatAnthropic({ model: 'claude-haiku-4-5-20251001' });

try {
  const response = await model.invoke('Say hello in 5 words.');
  console.log('SUCCESS:', response.content);
} catch (err) {
  console.error('FAILED:', err.message);
}
