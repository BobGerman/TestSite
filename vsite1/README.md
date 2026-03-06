# Customer API with Express and TypeScript

This is a simple web application that provides a RESTful API for managing customers along with a basic web interface.

## Features

- REST API with CRUD operations for customers:
  - GET /api/customers - List all customers
  - GET /api/customers/:id - Get a specific customer
  - POST /api/customers - Create a new customer
  - PUT /api/customers/:id - Update an existing customer
  - DELETE /api/customers/:id - Delete a customer

- Web interface to list all customers
- Mock data with 5 initial customers
- REST Client test file for testing the API

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Build the project:
   ```
   npm run build
   ```

3. Start the server:
   ```
   npm start
   ```

4. For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /` - Serve the web interface
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

## Testing

Use the `http/test.http` file with the REST Client extension in VS Code to test the API endpoints.