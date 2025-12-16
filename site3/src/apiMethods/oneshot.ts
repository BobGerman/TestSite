import model from '../aimodel';
import { generateText } from 'ai';

const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant who gives short and friendly answers, always 100 words or less.';
const DEFAULT_TEMPERATURE = 0.5;

export async function getLLMCompletion(prompt: string): Promise<string> {
  const { text } = await generateText({
    model,
    prompt,
    system: DEFAULT_SYSTEM_PROMPT,
    temperature: DEFAULT_TEMPERATURE
  });
  return text;
}

