import express, { Application, Request, Response } from 'express';
import { Customer, customers } from './customer';
import path from 'path';

const app: Application = express();
const PORT: number = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Get all customers
app.get('/api/customers', (req: Request, res: Response) => {
    res.json(customers);
});

// Get customer by ID
app.get('/api/customers/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(c => c.id === id);

    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
});

// Create new customer
app.post('/api/customers', (req: Request, res: Response) => {
    const { name, email, phone } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newCustomer: Customer = {
        id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
        name,
        email,
        phone: phone || ''
    };

    customers.push(newCustomer);
    res.status(201).json(newCustomer);
});

// Update customer
app.put('/api/customers/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const customerIndex = customers.findIndex(c => c.id === id);

    if (customerIndex === -1) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    const { name, email, phone } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    customers[customerIndex] = {
        ...customers[customerIndex],
        name,
        email,
        phone: phone || ''
    };

    res.json(customers[customerIndex]);
});

// Delete customer
app.delete('/api/customers/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const customerIndex = customers.findIndex(c => c.id === id);

    if (customerIndex === -1) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    const deletedCustomer = customers.splice(customerIndex, 1)[0];
    res.json(deletedCustomer);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});