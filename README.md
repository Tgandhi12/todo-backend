TodoFlow Backend is a Node.js + Express + MongoDB REST API that powers the full-stack TodoFlow application. It manages user authentication with JWT and bcryptjs for secure password handling, as well as task CRUD operations. Features include secret question/answer for password recovery, task categorization, importance flags, and due/scheduled date management. Built with TypeScript and Mongoose, the backend ensures scalability, validation, and robust error handling. It also includes CORS and middleware support for secure client–server communication.


# 🛠 TodoFlow Backend (Node.js + Express + MongoDB)

This is the **backend API** for the TodoFlow application.  
It handles user authentication (JWT), task management, and connects to MongoDB for persistent storage.

---

## ✨ Features
- 🔐 **Auth**: Register, Login, Forgot/Reset Password (with secret question/answer)
- 🗂 **Todos API**:
  - Create, Read, Update, Delete
  - Mark complete/incomplete
  - Category + importance flags
  - Due + scheduled dates
- 🛡 Secure password hashing with bcryptjs
- 🌐 CORS + JWT middleware


---
src/
├── models/ # Mongoose models (User, Todo)
├── routes/ # Auth routes + Todo routes
├── middleware/ # JWT auth middleware
└── index.ts # Express app entry

🛠 Tech Stack

Node.js + Express

MongoDB + Mongoose

TypeScript

bcryptjs + jsonwebtoken

nodemon + ts-node for dev

## 📂 Project Structure
