import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
    try {
        const {content} = req.body;

        if(!content){
            return res.status(400).json({message: "Post content is required"})
        }
    }
};