# Customer Management Express Application

This is a TypeScript Express.js application that provides a REST API for customer management with a web interface.

## Features

- REST API with CRUD operations for customers
- Web interface to view, add, edit, and delete customers
- TypeScript type safety
- Responsive design
- HTTP test file for VS Code REST Client extension

## API Endpoints

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get a specific customer
- `POST /api/customers` - Create a new customer
- `PUT /api/customers/:id` - Update an existing customer
- `DELETE /api/customers/:id` - Delete a customer

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

4. Start the production server:
   ```
   npm start
   ```

## Testing

Use the VS Code REST Client extension to test the API endpoints by opening `http/test.http` and sending requests.

## Project Structure

```
.
├── src/
│   ├── index.ts           # Main application file
│   ├── customer.ts        # Customer interface definition
│   └── customerDatabase.ts # Customer database operations
├── public/
│   ├── index.html         # Web interface
│   ├── styles.css         # CSS styling
│   └── script.js          # JavaScript for client-side interactions
├── http/
│   └── test.http          # HTTP test file for REST API testing
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── .gitignore             # Git ignore rules
```