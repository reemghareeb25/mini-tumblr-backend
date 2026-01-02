import express from "express"

import {
    createPost,
    getAllPosts,
    getUserPosts,
    updatePost,
    deletePost,
    toggleLikePost,
} from "../controllers/postController.js";

const router = express.Router();

import { 
    protect 
} from "../middlewares/authMiddlewares.js";

router.post("/", protect, createPost);
router.get("/", getAllPosts);
router.get("/user/:id", getUserPosts);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.put("/:id/like", protect, toggleLikePost);
router.get("/id", )
export default router;