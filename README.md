# Product Management App (Todo List)

A full-stack CRUD application for managing products, built with Vue.js (Frontend) and Node.js/Express + PostgreSQL (Backend).

## Prerequisites
- Node.js (v16+)
- PostgreSQL or Neon Database account

## Repository Structure
- `/backend`: Node.js, Express API, PostgreSQL configuration
- `/frontend`: Vue 3, Vite, Vue Router application
- `schema.sql`: Database schema definition

## Database Setup

1. Copy the `schema.sql` file content.
2. Go to your PostgreSQL database (e.g., Neon Console -> SQL Editor).
3. Run the SQL commands to create the `products` table.

## Backend Setup & Run

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. **Environment Variables Required**: Open the newly created `.env` file and insert your `DATABASE_URL` connection string from Neon.
   Example:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://neondb_owner:npg........@ep-icy-scene-az........-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```
5. Start the backend server:
   ```bash
   npm start
   # or for development mode:
   npm run dev
   ```

## Frontend Setup & Run

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL (typically `http://localhost:5173`) in your browser.

## Features
- List all products in a responsive grid
- Create new products (Name, Price, Description)
- View full product details
- Edit existing products
- Delete products
- Premium UI with dark mode styling and micro-animations
