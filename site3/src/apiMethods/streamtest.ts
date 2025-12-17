import model from '../aimodel';
import { streamText } from 'ai';
import { MethodArgs, MethodResponse } from './method';

const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant who gives short and friendly answers, always 100 words or less.';
const DEFAULT_TEMPERATURE = 0.5;

export async function getLLMCompletion(args: MethodArgs):
 Promise<MethodResponse> {
  let fullText = "";
  let chunkCount = 0;

  const { textStream } = streamText({
    model,
    prompt: args.userPrompt,
    system: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
    temperature: DEFAULT_TEMPERATURE
  });

  process.stdout.write("Streaming response: ");
  for await (const chunk of textStream) {
    process.stdout.write(chunk);
    fullText += chunk;
    chunkCount++;
  }
  process.stdout.write("\n");
  return {
    success: true,
    statusMessage: 'Streamed LLM completion successful',
    detailMessage: `${fullText.length} characters received in ${chunkCount} chunks.`,
    completion: fullText
  };
}