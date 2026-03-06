import { Customer } from './customer';

let customers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-9012' },
  { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', phone: '555-3456' },
  { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', phone: '555-7890' }
];

export const customerDatabase = {
  getAll: (): Customer[] => customers,

  getById: (id: number): Customer | undefined => customers.find(customer => customer.id === id),

  create: (customer: Omit<Customer, 'id'>): Customer => {
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const newCustomer: Customer = { ...customer, id: newId };
    customers.push(newCustomer);
    return newCustomer;
  },

  update: (id: number, customer: Partial<Customer>): Customer | undefined => {
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) return undefined;

    customers[index] = { ...customers[index], ...customer };
    return customers[index];
  },

  delete: (id: number): boolean => {
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) return false;

    customers.splice(index, 1);
    return true;
  }
};