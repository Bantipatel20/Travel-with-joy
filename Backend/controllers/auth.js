
const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:'User already register'
            })
        }
        const encodedpass = await bcrypt.hash(password,10)
        await User({name,email,password:encodedpass,role}).save();
        return res.status(200).json({
            success:true,
            message:"User Successfully Register"
        })
    }catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Error When user sign up"
        })
    }
}


exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"required email and password"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user cannot be register"
            })
        }
        const pass = await bcrypt.compare(password,user.password);
        if(!pass){
            return res.status(401).json({
                success:false,
                message:"Password Invalid"
            })
        }
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"})
        user.token = token;
        user.password=undefined;
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true
        }
        return res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"User Login successfully"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while Login",
            error: error.message 
        })
    }
}