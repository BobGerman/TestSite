import { weatherTool } from './weather-tool';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';

const modelProvider = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: process.env.LLM_BASE_URL || 'http://localhost:1234/v1',
  supportsStructuredOutputs: true
});

// TODO: Remove this debug log in production
console.log('Initializing weather agent...');

const model = modelProvider(process.env.LLM_MODEL_ID || "");
console.log(`Using LLM model: ${process.env.LLM_MODEL_ID}`);

export const weatherAgent = new ToolLoopAgent({
  model,
  instructions: 'You are a helpful assistant.',
  tools: {
    weather: weatherTool,
  },
});

export type WeatherAgentUIMessage = InferAgentUIMessage<typeof weatherAgent>;