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

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
        message: "Login successful",
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
        httpOnly: true,
        expires: new Date(0)
    });

    res.json({message: "Logged out successfully" });
};


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;  
        const user = await User.findById(userId).select("-password"); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
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

export const UpdateUserProfile = async(req, res) => {
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        req.body,
        {new : true}
    );
    res.json({message: "Profile updated", user: updatedUser});
};

export const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);

        if(!user) return res.status(404).json({message: "User not found!"});

        await user.deleteOne();
        res.json({message: "User deleted successfully!"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const followUser = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const targetUserId = req.params.id;

        if (currentUserId.toString() === targetUserId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!targetUser) return res.status(404).json({ message: "User not found" });

        if (currentUser.following.includes(targetUserId)) {
            return res.status(400).json({ message: "Already following this user" });
        }

        currentUser.following.push(targetUserId);
        targetUser.followers.push(currentUserId);

        await currentUser.save();
        await targetUser.save();

        res.json({ message: "Followed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const unfollowUser = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const targetUserId = req.params.id;

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!targetUser) return res.status(404).json({ message: "User not found" });
        if (!currentUser.following.includes(targetUserId)) {
            return res.status(400).json({ message: "You are not following this user" });
        }

        currentUser.following = currentUser.following.filter(
            (id) => id.toString() !== targetUserId
        );
        targetUser.followers = targetUser.followers.filter(
            (id) => id.toString() !== currentUserId.toString()
        );

        await currentUser.save();
        await targetUser.save();

        res.json({ message: "Unfollowed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFollowers = async (req, res) => {
    try {
        const userId = req.params.id || req.user._id;
        const user = await User.findById(userId)
            .populate("followers", "username email");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.followers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFollowing = async (req, res) => {
    try {
        const userId = req.params.id || req.user._id;

        const user = await User.findById(userId)
            .populate("following", "username email");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.following);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

