import { embed } from "ai";
// import model from "../aimodel";
import { LanguageModel } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export async function POST(req: Request) {

  const { prompt } = await req.json();

  // const { text } = await generateText({
  //   model,
  //   prompt: prompt || "Greet the user",
  //   system: systemPrompt || "You are a friendly AI assistant",
  //   temperature : temperature ?? 0.7,
  //   maxOutputTokens: 200,
  // });

  const modelProvider = createOpenAICompatible({
    name: 'lmstudio',
    baseURL: process.env.LLM_BASE_URL || 'http://localhost:1234/v1',
    supportsStructuredOutputs: true
  });

  const embeddingModel = modelProvider.embeddingModel(process.env.EMBEDDING_MODEL_ID || "")
  console.log(`Using embedding model: ${process.env.EMBEDDING_MODEL_ID}`);

  const { embedding } = await embed({
    model: embeddingModel,
    value: prompt || "Hello, world!",
  });

  for (const val of embedding) {
    console.log(val);
  }

  return Response.json({ embedding });

} 
