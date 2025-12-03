import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { generateText } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Parse JSON requests
app.use(express.json());


// Call the LLM
app.get('/api/message', async (req, res) => {

  try {

    let prompt = (req.query.prompt || 'Greet the user') as string;

    const modelProvider = createOpenAICompatible({
      name: 'lmstudio',
      baseURL: process.env.LLM_BASE_URL || 'http://localhost:1234/v1'
    });

    const model = modelProvider(process.env.LLM_MODEL_ID || "");

    const { text } = await generateText({
      model,
      prompt,
      system: 'You are a helpful assistant who gives short and friendly answers, always 30 words or less.',
      temperature: 0.5
    });
    res.json({
      success: true,
      statusMessage: 'LLM response retrieved successfully',
      completion: text
    });
  } catch (error: any) {
    console.error('Error calling LLM:', error);
    res.status(500).json({
      success: false,
      statusMessage: 'Error calling LLM',
      error: error.message
    });
  }
});


// Serve the main web page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    statusMessage: 'Server is running'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Utility functions

// Function to extract the final message from an OpenAI compatible response
// Example input:
//   '"<|channel|>analysis<|message|>We need to greet.<|end|><|start|>assistant<|channel|>final<|message|>Hello! How can I assist you today?'
// Exanoke result:
//   'Hello! How can I assist you today?'
function extractMessage(input: string): string {
  const FINAL_TEXT_MARKER = 'final<|message|>';
  const startIndex = input.indexOf(FINAL_TEXT_MARKER);

  if (startIndex === -1) {
    return 'No message found';
  }

  return input.substring(startIndex + FINAL_TEXT_MARKER.length).trim();
}

export default app;