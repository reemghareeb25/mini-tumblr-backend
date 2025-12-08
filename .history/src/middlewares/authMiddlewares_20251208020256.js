import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    try {
        let token;
        if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized — No token!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user to request object
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found!" });
        }

        next(); // Continue to next function
    } catch (error) {
        res.status(401).json({ message: "Invalid token!" });
    }
};
