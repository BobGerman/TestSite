import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { getLLMCompletion as getOneshotCompletion } from './apiMethods/oneshot';
import { getLLMCompletion as getStreamtestCompletion } from './apiMethods/streamtest';
import { getLLMCompletion as getChatCompletion } from './apiMethods/chat';

const DEFAULT_USER_PROMPT = 'Greet the user';

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
  '/api/oneshot',
  '/api/streamtest',
  '/api/chat'
], async (req, res) => {

  try {

    let prompt = (req.query.prompt || DEFAULT_USER_PROMPT) as string;
    let method = req.path.substring('/api/'.length); // Extract method from path

    let response;
    switch (method) {
      case 'oneshot': {
        response = await getOneshotCompletion({ userPrompt: prompt });
        break;
      }
      case 'streamtest': {
        response = await getStreamtestCompletion({ userPrompt: prompt });
        break;
      }
      case 'chat': {
        response = await getChatCompletion({ userPrompt: prompt });
        break;
      }
      default: {
        res.status(404).json({
          success: false,
          statusMessage: 'Unknown API endpoint'
        });
      }
    }

    res.json(response);

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