import { Customer } from './types';

export const customers: Customer[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', createdAt: '2024-01-15T10:30:00Z' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '555-0102', createdAt: '2024-01-20T14:45:00Z' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', phone: '555-0103', createdAt: '2024-02-01T09:15:00Z' },
  { id: 4, name: 'David Brown', email: 'david@example.com', phone: '555-0104', createdAt: '2024-02-10T16:00:00Z' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', phone: '555-0105', createdAt: '2024-02-15T11:30:00Z' }
];

export function getNextId(): number {
  return customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
}
