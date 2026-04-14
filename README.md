# Flipkart Clone — E-Commerce Platform

A full-stack e-commerce web application replicating Flipkart's UI and functionality.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite), React Router, Axios, React Toastify |
| Backend | Node.js, Express.js |
| Database | MySQL |

## Features

**Core**
- Product listing with grid layout (Flipkart-style cards)
- Search by product name / brand
- Filter by category
- Product detail page with image carousel, specs, and stock status
- Add to Cart / Buy Now
- Cart management (add, update quantity, remove)
- Checkout with shipping address form
- Order placement with order confirmation page (shows Order ID)

**Bonus**
- Wishlist (add/remove, move to cart)
- Order history page
- Responsive design (mobile, tablet, desktop)
- Toast notifications for user feedback
- Skeleton loading states

## Database Schema

```
categories         — product categories
products           — product info (price, stock, brand, rating)
product_images     — multiple images per product
product_specs      — key-value specs per product
users              — default user (no auth required)
cart_items         — user's cart (unique per user+product)
wishlist           — user's wishlist
orders             — placed orders with shipping snapshot
order_items        — items in each order (price snapshot)
```

## Setup Instructions

### Prerequisites
- Node.js v18+
- MySQL running locally

### 1. Database Setup

```bash
# Login to MySQL and run the schema
mysql -u root -p < backend/config/schema.sql
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MySQL credentials

# Seed the database with sample products
npm run seed

# Start the server
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
# App runs on http://localhost:5173
```

## Assumptions

- A default user (id=1, Rahul Sharma) is always logged in — no authentication required per assignment spec
- Delivery is free for orders above ₹500, otherwise ₹40
- Stock is reduced when an order is placed
- Cart is cleared after a successful order
- Product images use Unsplash URLs for demo purposes

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List products (supports ?search= and ?category=) |
| GET | /api/products/categories | All categories |
| GET | /api/products/:id | Single product with images & specs |
| GET | /api/cart | Get cart items |
| POST | /api/cart | Add to cart |
| PUT | /api/cart/:id | Update quantity |
| DELETE | /api/cart/:id | Remove from cart |
| POST | /api/orders | Place order |
| GET | /api/orders | Order history |
| GET | /api/orders/:id | Order details |
| GET | /api/wishlist | Get wishlist |
| POST | /api/wishlist | Add to wishlist |
| DELETE | /api/wishlist/:productId | Remove from wishlist |
