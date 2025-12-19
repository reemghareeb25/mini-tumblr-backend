import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        contetn: {
            type: String,
            required: [true, "Post content is requires"]
        }
    }
)