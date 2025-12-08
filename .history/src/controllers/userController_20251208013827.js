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

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
        });

        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ 
            message: "Invalid email" 
        });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ 
            message: "Wrong password" 
        });

        const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
        message: "Login successful",
        token,
        user,
        });
    } 
    catch (error) {
        res.status(500).json({ 
            message: error.message 
        });
    }
};

export const logoutUser = (req, res) => {
    res.cookie("token", "" , {
        http
    })
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found... "});
        }
        res.json(user);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } 
    catch (error) {
        res.status(500).json({ 
            message: error.message 
        });
    }
};