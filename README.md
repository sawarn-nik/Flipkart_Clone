# Flipkart Clone — E-Commerce Platform

A full-stack e-commerce web application replicating Flipkart's UI and core functionality, built as part of the Scaler SDE Assignment.

🔗 **Live Demo:** [https://flipkart-clone-frontend.vercel.app](https://flipkart-clone-frontend.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite), React Router v6, Axios, React Toastify |
| Backend | Node.js, Express.js |
| Database | MySQL (hosted on Aiven Cloud) |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel (frontend), Render (backend) |

---

## Features

### Core
- Flipkart-style homepage with banner carousel and category sections
- Product listing page with grid layout and product cards
- Category navigation bar with sliding indicator
- Search by product name / brand
- Filter by category (only shown on search results)
- Product detail page with image carousel, specs, ratings, and stock status
- Add to Cart / Buy Now
- Cart management (add, update quantity, remove)
- Checkout with shipping address + email form
- Order placement with order confirmation page
- Order history page with order status

### Bonus
- Wishlist (add/remove, move to cart)
- Cancel order (restores stock)
- Email notification on order placement (confirmation email with order summary)
- Email notification on order cancellation (with refund info)
- Delivery location selector (saves to localStorage)
- Responsive design (mobile, tablet, desktop)
- Toast notifications for user feedback
- Skeleton loading states
- SEO content section above footer
- Banner carousel on category pages

---

## Database Schema

```
categories         — product categories
products           — product info (price, stock, brand, rating)
product_images     — multiple images per product
product_specs      — key-value specs per product
users              — default user (no auth required)
cart_items         — user's cart (unique per user+product)
wishlist           — user's wishlist
orders             — placed orders with shipping snapshot (incl. email)
order_items        — items in each order (price snapshot)
```

---

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
# Edit .env with your MySQL credentials and email config
```

**.env variables:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=flipkart_clone
DB_PORT=3306
PORT=5000

# Gmail App Password (for order emails)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
```

> To get a Gmail App Password: Google Account → Security → 2-Step Verification → App Passwords

```bash
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

---

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
| POST | /api/orders | Place order (sends confirmation email) |
| GET | /api/orders | Order history |
| GET | /api/orders/:id | Order details |
| PATCH | /api/orders/:id/cancel | Cancel order + restore stock + send email |
| GET | /api/wishlist | Get wishlist |
| POST | /api/wishlist | Add to wishlist |
| DELETE | /api/wishlist/:productId | Remove from wishlist |

---

## Assumptions

- A default user (id=1, Rahul Sharma) is always logged in — no authentication required per assignment spec
- Delivery is free for orders above ₹500, otherwise ₹40
- Stock is reduced when an order is placed and restored when cancelled
- Cart is cleared after a successful order
- Email is optional at checkout — if provided, confirmation and cancellation emails are sent
- Only orders with status `confirmed` or `shipped` can be cancelled (`delivered` orders cannot)
- Product images use external URLs for demo purposes
- Delivery location is stored in localStorage (no backend persistence needed)
