## Inventory Management API (StoreFront)

This is a **RESTful API** built with **Node.js**, **Express**, and **Sequelize (MySQL)** that allows users to manage products and categories in an inventory system. The API supports full CRUD operations, authentication, and role-based access control.

---

###  Live Deployment

🔗 [Deployed Project on Railway](https://inventorymanagement-production-f5e6.up.railway.app/)

---

### 📘 API Documentation

📄 View full API documentation here:
👉 [Postman API Docs](https://documenter.getpostman.com/view/43171328/2sB2qcCgRX)

---

### 📁 Project Features

* ✅ User Authentication (JWT)
* ✅ Role-based Access (Admin, Customer)
* ✅ CRUD operations for:

  * Products
  * Categories
* ✅ Sequelize ORM with MySQL
* ✅ Middleware for route protection
* ✅ Organized MVC structure

---

### 🔐 Authentication

* Login returns a JWT token.
* Add token to `Authorization` header as:
  `Bearer <token>`

---

###  Technologies Used

* Node.js
* Express.js
* Sequelize
* MySQL
* Bcrypt.js
* JWT (jsonwebtoken)
* Railway (for deployment)

---

###  Getting Started Locally

1. **Clone the repo:**

   ```bash
   git clone https://github.com/your-username/inventory-management-api.git
   cd inventory-management-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file:**

   ```
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database
   TOKEN_KEY=your_jwt_secret
   ```

4. **Run the server:**

   ```bash
   npm run dev
   ```

---

###  Folder Structure

```
📦 inventory-management-api
├── config/
│   └── db.js
├── controllers/
├── middleware/
├── model/
├── routes/
├── util/
└── server.js / app.js
```

---

### 📮 API Endpoints Overview

* `POST /api/auth/login` – Login a user
* `POST /api/products` – Create product (admin only)
* `GET /api/products` – Get all products
* `PUT /api/products/:id` – Update a product
* `DELETE /api/products/:id` – Delete a product
* `GET /api/categories` – Get all categories
* ...and more in the [documentation](https://documenter.getpostman.com/view/43171328/2sB2qcCgRX)

---

### 🧑‍💻 Contributing

Contributions, issues, and feature requests are welcome! 
Thank you.




