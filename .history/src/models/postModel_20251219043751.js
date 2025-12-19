import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        contetn: {
            type: String,
            required: [true, "Post content is requires"],
            trim: true,
            maxlength: 5000,
        },

        author: {
            type: mongoose.Schema.Types.ObejectId,
        }
    }
)