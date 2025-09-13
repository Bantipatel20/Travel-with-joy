import jwt from "jsonwebtoken"
import user from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const auth = async(req,res,next)=>{
    const authheader = req.header.authorization || req.header.Authorization

    if(!authheader?.startsWith("Bearer ")){
        return res.status(401).json({
            message:"Unauthorization : no token"
        })
    }

    const token = authheader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user =  { id:decoded._id , role:decoded.role };
        next();
    }catch(err){
        return res.status(403).json({
            message:"Invalid Token"
        })
    }
}

export const adminonly = async(req,res,next)=>{
    if(req.user?.role!=="admin"){
        return res.status(403).json({
            message:"Forbidden: Admin only"
        });
    }
    next();
}


