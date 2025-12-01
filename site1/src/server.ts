import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Parse JSON requests
app.use(express.json());

// Sample hard-coded data
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' }
];

// API endpoint with hard-coded data
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    message: 'Users retrieved successfully',
    data: sampleData
  });
});

// Call the LLM
app.get('/api/message', (req, res) => {

  let prompt = req.query.prompt || 'Greet the user';
  prompt += 'Answer in 25 words or less.';

  const LLM_SERVER_URL = 'http://tehuti.lab:81/v1/completions';
  
  // Make a POST request to LLM server
  fetch(LLM_SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.5
    })
  })
    .then(response => response.json())
    .then(data => {
      let d: any = data as any;
      res.json({
        success: true,
        statusMessage: 'LLM response retrieved successfully',
        completion: extractMessage(d.choices[0].text)
      });
    })
    .catch(error => {
      console.error('Error calling LLM server:', error);
      res.status(500).json({
        success: false,
        statusMessage: 'Error calling LLM server',
        error: error.message
      });
    });
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

// Function to take input in the form:
// '"<|channel|>analysis<|message|>We need to greet.<|end|><|start|>assistant<|channel|>final<|message|>Hello! How can I assist you today?'
// and return the extracted message: 'Hello! How can I assist you today?'
function extractMessage(input: string): string {
  const FINAL_TEXT_MARKER = 'final<|message|>';
  const startIndex = input.indexOf(FINAL_TEXT_MARKER);

  if (startIndex === -1 ) {
    return 'No message found';
  }

  return input.substring(startIndex + FINAL_TEXT_MARKER.length).trim();
}

export default app;