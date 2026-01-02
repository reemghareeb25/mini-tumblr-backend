import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
    try {
        const {content} = req.body;

        if(!content){
            return res.status(400).json({message: "Post content is required "});
        }

        const post = await Post.create({
            content,
            author: req.user._id
        });
        const populatedPost = await post.populate(
            "author",
            "name email avatar"
        );
        res.status(201).json(populatedPost);
    }
    catch(error){
        console.log(req.user);

        res.status(500).json({message: error.message});
    }
};

export const getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find().
        populate("author", "name avatar").
        sort({createdAt: -1});

        res.json(posts);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

export const getUserPosts = async (req, res) => {
    try{
        const posts = await Post.find({user: req.params.id}).
        populate("user", "name avatar").
        sort({createdAt: -1});

        res.json(posts);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const updatePost  = async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        post.content = req.body.content || post.content;
        await post.save();

        res.json({message: "Post updated successfully",  post});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post)
            return res.status(404).json({ message: "Post not found" });

        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleLikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: "Post not found" });

        const userId = req.user._id.toString();
        const alreadyLiked = post.likes.some(
            (id) => id.toString() === userId
        );

        if (alreadyLiked) {
            // UNLIKE
            post.likes = post.likes.filter(
            (id) => id.toString() !== userId
            );
        } else {
            // LIKE
            post.likes.push(userId);
        }

        await post.save();

        res.json({
            message: alreadyLiked ? "Post unliked" : "Post liked",
        });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};