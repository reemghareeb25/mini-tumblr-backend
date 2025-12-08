import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const protect = async(req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return res.status(401).josn({message: "Not authorized. No token!"});
        }
    }
    catch(error){

    }
};