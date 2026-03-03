import express, { Request, Response } from 'express';
import { Customer as CustomerType } from './types';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Customer interface and mock data
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// Initialize with 5 mock customers
let customers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '345-678-9012' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '456-789-0123' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', phone: '567-890-1234' }
];

// API Routes

// GET /api/customers - List all customers
app.get('/api/customers', (req: Request, res: Response) => {
  res.json(customers);
});

// GET /api/customers/:id - Get a specific customer
app.get('/api/customers/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  res.json(customer);
});

// POST /api/customers - Create a new customer
app.post('/api/customers', (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Create new customer with next available ID
  const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
  const newCustomer: Customer = {
    id: newId,
    name,
    email,
    phone: phone || ''
  };

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

// PUT /api/customers/:id - Update a customer
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

  // Update customer
  customers[customerIndex] = {
    id,
    name,
    email,
    phone: phone || ''
  };

  res.json(customers[customerIndex]);
});

// DELETE /api/customers/:id - Delete a customer
app.delete('/api/customers/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const customerIndex = customers.findIndex(c => c.id === id);

  if (customerIndex === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const deletedCustomer = customers.splice(customerIndex, 1)[0];
  res.json({ message: `Customer ${deletedCustomer.name} deleted successfully` });
});

// GET / - Serve the web interface
app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Customer Management</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .btn { background-color: #4CAF50; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; margin: 5px; }
          .btn-delete { background-color: #f44336; }
          .form-group { margin-bottom: 15px; }
          label { display: block; margin-bottom: 5px; }
          input[type="text"], input[type="email"] { width: 100%; padding: 8px; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <h1>Customer Management</h1>
        <div id="customer-list">
          <h2>Customers</h2>
          <table id="customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Customer rows will be populated by JavaScript -->
            </tbody>
          </table>
        </div>
        <script>
          // Fetch customers and display them
          fetch('/api/customers')
            .then(response => response.json())
            .then(customers => {
              const tbody = document.querySelector('#customers-table tbody');
              customers.forEach(customer => {
                const row = tbody.insertRow();
                row.innerHTML = \`
                  <td>\${customer.id}</td>
                  <td>\${customer.name}</td>
                  <td>\${customer.email}</td>
                  <td>\${customer.phone}</td>
                  <td><a href="#" class="btn btn-delete" onclick="deleteCustomer(\${customer.id})">Delete</a></td>
                \`;
              });
            })
            .catch(error => console.error('Error fetching customers:', error));

          // Delete customer function
          function deleteCustomer(id) {
            if (confirm('Are you sure you want to delete this customer?')) {
              fetch('/api/customers/' + id, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                  alert(data.message);
                  location.reload(); // Refresh the page
                })
                .catch(error => console.error('Error deleting customer:', error));
            }
          }
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});