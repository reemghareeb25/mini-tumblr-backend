import express from "express";
import { addComment, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

import { protect } from "../middlewares/authMiddleware.js";

router.post("/:postId", protect, addComment);
router.delete("/:id", protect, deleteComment);

export default router;
