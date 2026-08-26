# Nexus Inventory (Product Management App)

A full-stack CRUD application built with Vue 3 (Frontend) and Node.js/Express + PostgreSQL (Backend). Features a sleek Tailwind CSS dark-mode UI

## Quick Start

### 1. Database Setup
Execute the contents of `schema.sql` in your PostgreSQL database (e.g., Neon SQL Editor) to create the `products` table

### 2. Backend (API)
cd backend
npm install

### Create .env and add your PostgreSQL DATABASE_URL
cp .env.example .env 

# Development server on port 3000
npm run dev

### 3. Frontend
Open a new terminal:
cd frontend
npm install

# Vite dev server on port 5173
npm run dev
Open `http://localhost:5173`
