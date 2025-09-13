
import Destination from '../models/destination.js'
import { validationResult } from "express-validator";

export const getalldestination = async(req ,res)=>{
    try{
        const list = await Destination.find().sort({createdAt:-1})
        res.json(list);
    }catch(err){
        res.status(500).json({message:"Error fecthing destination"});
    }
}

export const createdestination = async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            error : error.array()
        })
    }    
    
    try{
        const { name, location , description , pricerange } = req.body;

        const iamgeurl = req.files.map(file=>file.path) || [];
        console.log(iamgeurl);
        const destination = new Destination({
            name,
            location,
            description,
            images:iamgeurl,
            pricerange
        })
        console.log(destination);
        await destination.save();
        res.status(201).json(destination);
    }catch(err){
        return res.status(500).json({message:"Error create destination "})
    }
}

export const updatedestination = async(req,res)=>{
    try{
        const updates = req.body;
        
       if(req.files && req.files.length > 0){ updates.images = req.files.map(file=>file.path); }
       
        const dest = await Destination.findByIdAndUpdate(req.params.id,updates,{new:true});

        res.json(dest);
    }catch(err){
        res.status(500).json({
            message:"Error Updating Destination "
        })
    }
}


export const deletedestination = async(req,res)=>{
    try{
        await Destination.findByIdAndDelete(req.params.id);
        res.json({message:"Destination Deleted"});
    }catch(err){
        res.status(500).json({message:" Error deleting destination "})
    }
}
