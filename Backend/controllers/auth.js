
const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async(req,res)=>{
    try{
        console.log("Here contro")
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
        return res.status(200).json({
            success:true,
            message:"User Login successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while Login"
        })
    }
}