import model from '../aimodel';
import { generateText } from 'ai';
import { TestArgs, TestResponse } from './interfaces';

const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant who gives short and friendly answers, always 100 words or less.';
const DEFAULT_USER_PROMPT = 'Find a creative way to say hello, world';
const DEFAULT_TEMPERATURE = 0.5;

export async function getLLMCompletion(args: TestArgs):
  Promise<TestResponse> {
  const { text } = await generateText({
    model,
    prompt: args.userPrompt || DEFAULT_USER_PROMPT,
    system: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
    temperature: DEFAULT_TEMPERATURE
  });
  return {
    userPrompt: args.userPrompt || DEFAULT_USER_PROMPT,
    systemPrompt: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
    success: true,
    statusMessage: 'LLM completion successful',
    completion: text
  };
}

