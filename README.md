# Mini Tumblr (Backend)

This is a **mini-Tumblr** backend project, inspired by the popular Tumblr platform.  
It is built using **Node.js, Express.js, and MongoDB**.

---

## Features

- User registration & login (with JWT authentication)
- User profile management
- Follow / Unfollow other users
- Get followers / following
- Protected routes with JWT
- Logout functionality

---

## Technologies

- Node.js
- Express.js
- MongoDB & Mongoose
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)

---

## Getting Started

Follow these steps to run the project locally:

1. Clone the repository:
```bash
git clone https://github.com/reemghareeb25/mini-tumblr-backend.git
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the root folder with the following variables:
```bash
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.he0d5hh.mongodb.net/tumblrDB
JWT_SECRET=yourStrongSecretKey
JWT_EXPIRE=30d
```
> Note: Replace the MongoDB URI in the `.env` file with your own credentials before running the project.

4. Start the server:
```bash
npm run dev
```

