import express, { Request, Response } from 'express';
import { customerDatabase } from './customerDatabase';
import { Customer } from './customer';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/customers', (req: Request, res: Response) => {
  try {
    const customers = customerDatabase.getAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

app.get('/api/customers/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const customer = customerDatabase.getById(id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

app.post('/api/customers', (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const newCustomer = customerDatabase.create({ name, email, phone });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

app.put('/api/customers/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const updatedCustomer = customerDatabase.update(id, { name, email, phone });

    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

app.delete('/api/customers/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = customerDatabase.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

// Serve the HTML page
app.get('/', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: './public' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});