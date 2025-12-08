import express from "express"

import {
    registerUser, 
    loginUser,
    logoutUser,
    getAllUsers,
    getUserProfile,
    UpdateUserProfile,

} from "../controllers/userController.js"

import {protect }
const router = express.Router();

// user Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers)

export default router;