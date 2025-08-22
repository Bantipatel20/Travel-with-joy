
const { nextTick } = require("engine.io-client");
const jwt = require("jsonwebtoken");
const { UNSAFE_WithHydrateFallbackProps } = require("react-router-dom");
require("dotenv").config();


exports.auth = (req,res,next)=>{
    try{
        const token = req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing"
            })
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Token Invalid"
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"Error while verify the token"
        })
    }
}

exports.isClient = (req,res,next)=>{
    try{
        if(req.user.role!="client"){
            return res.status(401).json({
                success:false,
                message:"This is the protected route for the client"
            })
        }
        next()
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not match"
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role!="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is the protected route for the Admin"
            })
        }
        next()
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not match"
        })
    }
}