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
    unfollowUSer,
    getFolloers,
    getFol

} from "../controllers/userController.js"

import { 
    protect 
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Actions
router.get("/", getAllUsers);
router.get("/me", protect, getUserProfile);
router.put("/update", protect, UpdateUserProfile);

export default router;