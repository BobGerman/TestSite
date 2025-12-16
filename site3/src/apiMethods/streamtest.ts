import model from '../aimodel';
import { streamText } from 'ai';

const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant who gives short and friendly answers, always 100 words or less.';
const DEFAULT_TEMPERATURE = 0.5;

export async function getStreamedCompletion(prompt: string): Promise<string> {
  let fullText = "";

  const { textStream } = streamText({
    model,
    prompt,
    system: DEFAULT_SYSTEM_PROMPT,
    temperature: DEFAULT_TEMPERATURE
  });

  process.stdout.write("Streaming response: ");
  for await (const chunk of textStream) {
    process.stdout.write(chunk);
    fullText += chunk;
  }
  process.stdout.write("\n");
  return fullText;
}