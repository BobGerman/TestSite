import { embed } from "ai";
import { LanguageModel } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export async function POST(req: Request) {

  const { prompt } = await req.json();

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
