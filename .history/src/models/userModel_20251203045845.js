import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is requires'],
            trim: true,
            minlength: 2,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            uni
        }
    }
)