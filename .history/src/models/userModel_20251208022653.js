import mongoose from "mongoose"
import validator from "validator"

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
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        avatar: {
            type: String,
            default: "",
        },
        bio: {
            type: String, 
            default: "",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;