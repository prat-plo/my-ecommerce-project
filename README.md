# 🛒 Full-Stack MERN E-Commerce Application

A modern, responsive full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js) with Tailwind CSS. Features full CRUD operations, authentication, product listings, and order submission flows.

🔗 **Live Demo:**
* **Frontend (Vercel):** https://my-ecommerce-project-five.vercel.app/
* **Backend API (Render):** https://my-ecommerce-api-iowl.onrender.com/

---

## ✨ Features

* **Authentication & Authorization**: JWT-based login and local storage management for user sessions.
* **Product Catalog**: Dynamic rendering of products fetched directly from MongoDB via REST API.
* **Shopping Cart**: Interactive cart system with quantity adjustment, total price calculation, and checkout workflows.
* **Admin Management**: Dedicated admin panel for performing CRUD operations on products.
* **Responsive Design**: Mobile-friendly, modern UI crafted with Tailwind CSS and dark mode support.

---

## 🚧 Development Roadmap

### 🔴 Phase 1 — ทำให้ระบบพื้นฐานถูกต้อง ✅

1. แก้ช่องโหว่ `isAdmin` ✅
2. Authentication / Authorization ✅
3. User Profile ✅
4. Product Image Upload ✅
5. Product Stock ✅
6. Validation ✅
7. Error Handling ✅

↓

### 🟠 Phase 2 — ทำให้ซื้อสินค้าได้จริง

1. Checkout ✅
2. Shipping Address
3. Order System ใหม่
4. Order History
5. Order Status
6. Payment Method
7. Shipping / Tracking

↓

### 🟡 Phase 3 — ทำให้เหมือน E-commerce จริง

1. Search
2. Filter
3. Sort
4. Pagination
5. Wishlist
6. Review & Rating
7. Coupon
8. Product Variant

↓

### 🟢 Phase 4 — ทำ Admin ให้ Professional

1. Dashboard
2. Sales Analytics
3. User Management
4. Order Management
5. Inventory Management
6. Review Management
7. Coupon Management

↓

### 🔵 Phase 5 — Production

1. Payment Gateway
2. Email Notification
3. Forgot Password
4. Refresh Token
5. Rate Limit
6. Security Hardening
7. Logging
8. Testing
9. CI/CD

---

## 🛠️ Tech Stack & Deployment

### **Frontend**
* **Framework:** React.js + Vite
* **Styling:** Tailwind CSS
* **State Management:** React Hooks (`useState`, `useEffect`)
* **HTTP Client:** Axios
* **Hosting:** Vercel

### **Backend**
* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & Bcrypt
* **Hosting:** Render

---

## 📁 Project Structure

```text
├── backend/
│   ├── config/         # Database connection settings
│   ├── controllers/    # Request handlers & logic
│   ├── models/         # Mongoose schema definitions
│   ├── routes/         # Express API routes
│   └── server.js      # Express server entry point
│
└── frontend/
    ├── public/         # Static assets
    └── src/
        ├── components/ # Modular UI components (Navbar, Cart, ProductCard, Admin, Login)
        ├── App.jsx     # Main React application entry & state
        └── main.jsx    # React DOM rendering
```

## 🚀 Getting Started Locally
Prerequisites
  - Node.js (v18 or higher)
  - MongoDB Atlas Account or Local MongoDB instance
1. Clone Repository
  - git clone https://github.com/prat-plo/my-ecommerce-project
  - cd my-ecommerce
2. Setup Backend
  - cd backend
  - npm install
Create a .env file in the backend directory:
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
Start backend dev server:
  - npm run dev
3. Setup Frontend
  - cd ../frontend
  - npm install
  - npm run dev

📌 API Endpoints Summary
  Method    Endpoint            Description                   Access
  GET       /api/products       Fetch all products            Public
  POST      /api/products       Add a new product             Admin
  POST      /api/orders         Submit a new order            Public
  POST      /api/auth/login     User login & JWT issuance     Public

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
