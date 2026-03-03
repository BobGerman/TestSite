# Customer API with Express

A simple web application built with TypeScript and Express that provides CRUD operations for customers.

## Features

- RESTful API with CRUD operations on customers
- Web interface to list customers
- Mock data with 5 initial customers
- HTTP client testing file included

## API Endpoints

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get a specific customer
- `POST /api/customers` - Create a new customer
- `PUT /api/customers/:id` - Update a customer
- `DELETE /api/customers/:id` - Delete a customer

## Setup Instructions

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

## Testing

The project includes a `test.http` file in the `http` directory that can be used with the REST Client extension for Visual Studio Code to test all API endpoints.

## Files

- `src/index.ts` - Main application entry point
- `src/types.ts` - TypeScript interface definitions
- `http/test.http` - HTTP client tests
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.gitignore` - Git ignore rules