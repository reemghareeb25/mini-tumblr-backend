import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
    try {
        const {content} = req.body;

        if(!content){
            return res.status(400).json({message: "Post content is required "});
        }

        const post = await Post.create({
            content,
            user: req.user_id
        });
        res.status(201).json(post);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};