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
