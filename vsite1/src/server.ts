import express, { Request, Response } from 'express';
import { customers, getNextId } from './customers';
import { Customer } from './types';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// GET /api/customers - List all customers
app.get('/api/customers', (req: Request, res: Response) => {
  res.json(customers);
});

// GET /api/customers/:id - Get a single customer
app.get('/api/customers/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const customer = customers.find(c => c.id === id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(customer);
});

// POST /api/customers - Create a new customer
app.post('/api/customers', (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const newCustomer: Customer = {
    id: getNextId(),
    name,
    email,
    phone,
    createdAt: new Date().toISOString()
  };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

// PUT /api/customers/:id - Update a customer
app.put('/api/customers/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  const { name, email, phone } = req.body;
  customers[index] = {
    ...customers[index],
    name: name ?? customers[index].name,
    email: email ?? customers[index].email,
    phone: phone ?? customers[index].phone
  };
  res.json(customers[index]);
});

// DELETE /api/customers/:id - Delete a customer
app.delete('/api/customers/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  customers.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
