import { mcpTool } from './mcp-tool';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';

const modelProvider = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: process.env.LLM_BASE_URL || 'http://localhost:1234/v1',
  supportsStructuredOutputs: true
});

// TODO: Remove this debug log in production
console.log('Initializing MCP agent...');

const model = modelProvider(process.env.LLM_MODEL_ID || "");
console.log(`Using LLM model: ${process.env.LLM_MODEL_ID}`);

export const mcpAgent = new ToolLoopAgent({
  model,
  instructions: 'You are a helpful assistant.',
  tools: {
    mcp: mcpTool,
  },
});

export type McpAgentUIMessage = InferAgentUIMessage<typeof mcpAgent>;