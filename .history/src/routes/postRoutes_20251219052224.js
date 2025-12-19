import express from "express"

import {
    createPost,
    getAllPosts,
    getUserPosts,
    updatePost,
    deletePost,
    toggleLikePost,
} from "../controllers/postController.js";

