import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                message: "All feilds are required"
            });
        }

        const exists = await User.findOne({email});
        if(exists){
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashed = await byc
    }
}