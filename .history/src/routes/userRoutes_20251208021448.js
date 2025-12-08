import express from "express"

import {
    registerUser, 
    loginUser,
    logoutUser,
    getAllUsers,
    getUserProfile,
    UpdateUserProfile,
    deleteUser,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,

} from "../controllers/userController.js"

import { 
    protect 
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);


// protected routes
router.post("/logout", logoutUser);
router.get("/profile/:id", protect, get)
router.put("/update", protect, UpdateUserProfile);

export default router;