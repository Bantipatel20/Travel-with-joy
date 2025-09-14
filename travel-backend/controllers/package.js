import Package from '../models/package.js';
import { validationResult } from "express-validator";

export const getallpackage = async(req ,res)=>{
    try{
        const packaget = await Package.find().sort({createdAt:-1});

        res.json(packaget);
    }catch(err){
        res.status(500).json({message:"Error Fetching Package"})
    }
}

export const createallpackage = async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(400).json({error:error.array()});
    }
    try{    
        const {name,description,price,destinationid,hotelid,transportid,seatsAvailable} = req.body;

        const newpackage = await Package.create({name,destinationid,description,price,seatsAvailable,hotelid,transportid});

        res.status(201).json(newpackage);

    }catch(err){
        res.status(500).json({message:"Error Creating Package"});
    }
}

export const updatepackage = async(req ,res)=>{
    try{
        const update = req.body;

        const newpackage = await Package.findByIdAndUpdate(req.params.id,update,{new:true}); 

        res.json(newpackage);
    }catch(err){
        res.status(500).json({message:"Error update Package"})
    }
}

export const deletepackage = async(req ,res)=>{
    try{
        await Package.findByIdAndDelete(req.params.id);
    
        res.json({message:"Delete Package"});
    }catch(err){
        res.status(500).json({message:"Error Delete Package"})
    }
}