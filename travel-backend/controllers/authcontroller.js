import { validationResult } from "express-validator";
import User from '../models/user.js'
import bcrypt, { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

export const register = async(req,res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }
    const {name,email,password} = req.body;
    try{
        
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already Exist"
            })
        } 
        
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password,salt);
      
        user = new User({name,email,password:hashed});
        await user.save();
        console.log("before jwt");
        const token = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );
        console.log("jwt");
        res.status(201).json(
            {
                token,
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },
                message:"register succesfull"
            }
        )
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error register user"
        })
    }
}

export const login = async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }

    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"User not Register"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Password"
            })
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            message:"login succesfull"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Error while Login"
        })
    }
}

export const me  = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"server error"})
    }
}

