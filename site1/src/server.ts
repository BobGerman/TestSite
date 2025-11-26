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

// Serve the main web page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Server is running'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;