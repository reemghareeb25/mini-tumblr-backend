import express from "express"

import {
    registerUser, 
    loginUser,
    logoutUser,
    getAllUsers,
    getUserProfile,
    UpdateUser

} from "../controllers/userController.js"

const router = express.Router();

// user Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers)

export default router;