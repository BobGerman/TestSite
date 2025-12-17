import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { getLLMCompletion } from './apiMethods/oneshot';
import { getStreamedCompletion } from './apiMethods/streamtest';

const DEFAULT_USER_PROMPT = 'Greet the user';
const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant who gives short and friendly answers, always 100 words or less.';
const DEFAULT_TEMPERATURE = 0.5;

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
app.get([
  '/api/message',
  '/api/streamtest'
], async (req, res) => {

  try {

    let prompt = (req.query.prompt || DEFAULT_USER_PROMPT) as string;
    let method = req.path.substring('/api/'.length); // Extract method from path

    let response;
    switch (method) {
      case 'message': {
        response = await getLLMCompletion({ userPrompt: prompt });
        break;
      }
      case 'streamtest': {
        response = await getStreamedCompletion({ userPrompt: prompt });
        break;
      }
      default: {
        res.status(404).json({
          success: false,
          statusMessage: 'Unknown API endpoint'
        });
      }
    }

    res.json({
      success: response?.success,
      statusMessage: response?.statusMessage,
      detailMessage: response?.detailMessage,
      completion: response?.completion
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;