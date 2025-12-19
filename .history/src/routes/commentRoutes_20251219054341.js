import express from "express";
import { addComment, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:postId", protect, addComment);
router.delete("/:id", protect, deleteComment);

export default router;
