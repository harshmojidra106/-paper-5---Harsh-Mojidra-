# 📦 Ecommerce Website – Backend (Node.js + MongoDB)

This project is developed as part of the practical examination.  
It includes backend development using **Node.js**, **Express**, and **MongoDB**, with user authentication and basic ecommerce functionality.

---

## 🚀 Features Implemented

### 🔐 Authentication
- User Signup
- User Login
- JWT-based Logout
- Password hashing (bcrypt)

### 🛍 Ecommerce Functionalities
- Product creation
- Get all products
- Search products
- Homepage product listing
- Image uploading using **ImageKit** (used as an alternative to Multer)

---

## 📂 Project Structure

```
backend/
├─ controllers/
├─ middleware/
├─ models/
├─ routes/
├─ db_dump/ ← MongoDB dump included
│  └─ Ecommerce/
│     ├─ products.bson
│     ├─ products.metadata.json
│     ├─ users.bson
│     ├─ users.metadata.json
├─ package.json
├─ server.js
└─ README.md
```

---

## ⚙️ API Configuration Details

### 🔧 Environment Variables (.env)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/Ecommerce
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_endpoint
```

### ▶ Start the server

```bash
npm install
npm start
```

Backend will run on:
```
http://localhost:3000
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register new user |
| POST | /api/auth/login | Login user & get token |
| GET | /api/auth/logout | Logout user |
| GET | /api/products | Fetch all products |
| POST | /api/products | Add a new product |
| GET | /api/products/search?query=keyword | Search products |

---

## 🗄 MongoDB Database Dump

A database dump is included inside the repository at:
```
/backend/db_dump/Ecommerce
```

### 🔁 Restore Database (Local MongoDB)

```bash
mongorestore --db Ecommerce ./db_dump/Ecommerce
```

After restoring, the backend will work with sample users and product data.

---

## 🧠 Challenges Faced & Solutions

| Challenge | Issue Faced | Solution |
|----------|-------------|----------|
| Image upload | Did not know Multer for image handling | Used **ImageKit** for cloud-based image upload |
| JWT authentication | Secure routes were not protected | Implemented auth middleware to verify token |
| Product search | Search was not responding | Implemented MongoDB regex query for case-insensitive search |
| Database dump | `mongodump` not recognized | Installed MongoDB Database Tools & used correct path |

---

## 🧰 Technologies Used

| Component | Technology |
|----------|-------------|
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose |
| Security | JWT, bcrypt |
| File Upload | ImageKit |
| Tools | Postman, MongoDB Compass |

---

## 👨💻 Developer

**Harsh Mojidra**  


## 📜 Conclusion

This project helped me gain hands-on experience with:
- Node.js backend development
- Working with MongoDB and authentication
- Image uploading via third-party service
- Creating and restoring MongoDB database dump
- Building REST APIs for ecommerce systems