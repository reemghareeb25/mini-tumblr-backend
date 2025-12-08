import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is requires'],
            trim: true,
            minlength: 2,
        },
        em
    }
)