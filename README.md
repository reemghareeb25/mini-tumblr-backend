
````markdown
# Mini Tumblr Backend

A simple backend for a mini version of Tumblr, inspired by Tumblr.  
Handles users, posts, comments, and follow system.

## Features

### Users
- Sign up
- Login
- Logout
- Update profile
- Get user by ID
- Delete user

### Posts
- Create post (text only)
- Edit post
- Delete post
- Get all posts
- Get user posts
- Like post
- Unlike post

### Comments
- Add comment
- Delete comment

### Follow
- Follow user
- Unfollow user
- Get followers
- Get following

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally

### Installation
1. Clone the repository:
```bash
git clone https://github.com/reemghareeb25/mini-tumblr-backend.git
````

2. Navigate to the project folder:

```bash
cd mini-tumblr-backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root of the project with the following content:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tumblrDB
JWT_SECRET=yourStrongSecretKey
JWT_EXPIRE=30d
```

5. Run the development server:

```bash
npm run dev
```

The backend will be running on `http://localhost:5000`.

---
