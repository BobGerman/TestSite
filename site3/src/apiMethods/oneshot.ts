import model from '../aimodel';
import { generateText } from 'ai';
import { MethodArgs, MethodResponse } from './method';

const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant who gives short and friendly answers, always 100 words or less.';
const DEFAULT_USER_PROMPT = 'Greet the user in a friendly manner.';
const DEFAULT_TEMPERATURE = 0.5;

export async function getLLMCompletion(args: MethodArgs):
  Promise<MethodResponse> {
  const { text } = await generateText({
    model,
    prompt: args.userPrompt || DEFAULT_USER_PROMPT,
    system: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
    temperature: DEFAULT_TEMPERATURE
  });
  return {
    success: true,
    statusMessage: 'LLM completion successful',
    completion: text
  };
}

