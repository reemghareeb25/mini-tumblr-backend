import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const addComment = async (req, res) => {
    try {
    const { text } = req.body;
    const postId = req.params.postId;

    if (!text) {
        return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
        text,
        user: req.user._id,
        post: postId,
    });

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({
        message: "Comment added successfully",
        comment,
    });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const post = await Post.findById(comment.post);

    const isCommentOwner =
      comment.user.toString() === req.user._id.toString();
    const isPostOwner =
      post.user.toString() === req.user._id.toString();

    if (!isCommentOwner && !isPostOwner) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comment.findByIdAndDelete(commentId);

    post.comments = post.comments.filter(
      (id) => id.toString() !== commentId
    );
    await post.save();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

