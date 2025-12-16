import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { generateText, streamText } from 'ai';
import { getLanguageModel } from './aimodel';

const DEFAULT_USER_PROMPT = 'Greet the user';
const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant who gives short and friendly answers, always 100 words or less.';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Parse JSON requests
app.use(express.json());

// Serve the main web page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// /api/message - one-shot LLM call
const model = getLanguageModel();
app.get('/api/message', async (req, res) => {

  try {

    let prompt = (req.query.prompt || DEFAULT_USER_PROMPT) as string;

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

// /api/streamtest - test LLM streaming
app.get('/api/streamtest', async (req, res) => {
  try {
    // Test code for streaming response (not used in main code)
    let prompt = (req.query.prompt || DEFAULT_USER_PROMPT) as string;
    let fullText = "";

    const { textStream } = streamText({
      model,
      prompt,
      system: DEFAULT_SYSTEM_PROMPT,
      temperature: 0.5
    });

    process.stdout.write ("Streaming response: ");
    for await (const chunk of textStream) {
      process.stdout.write(chunk);
      fullText += chunk;
    }
    process.stdout.write ("\n");

    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      statusMessage: `LLM returned ${fullText.length} characters:<br /> ${fullText}`
    });

  } catch (error: any) {

    console.error('Stream test error:', error);
    res.status(500).json({
      status: 'ERROR',
      statusMessage: 'Server encountered an error',
      error: error.message
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;