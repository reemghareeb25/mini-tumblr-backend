import express from "express"

import {
    registerUser, loginUser, getAllUsers 
} from "../controllers/userController.js"

const router = express.Router();

router.post("/register", registerUser);
router.