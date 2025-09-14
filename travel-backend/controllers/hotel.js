import { validationResult } from "express-validator";
import Hotel from "../models/hotel.js";
import { json } from "express";


export const getallhotel = async(req,res)=>{
    try{
        const hotel = await Hotel.find().sort({createdAt:-1});
        res.json(hotel);
    }catch(err){
        return res.status(500).json({message:"Error Fetching Hotel"})
    }
};

export const createhotel = async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }
    try{
        const {name,location,price,rating,availableroom} = req.body

        const imageurl = req.files.map(file=>file.path) || [];

        const hotel = new Hotel({
            name,
            location,
            price,
            rating,
            availableroom,
            images:imageurl
        })

        await hotel.save();

        res.status(201).json(hotel);

    }catch(err){
        res.status(500).json({message:"Error Creating Hotel"});
    }
}

export const updatehotel = async(req,res)=>{
    try{
        const update = req.body
        if(req.files && req.files.length > 0){
            update.images = req.files.map(file=>file.path);
        }

        const hotel = await Hotel.findByIdAndUpdate(req.params.id,update,{new:true});
        res.json(hotel);
    }catch(err){
        res.status(500).json({message:"Error Updating Hotel"})
    }
}

export const deletehotel = async(req,res)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);

        res.json({message:"Hotel Delete"})
    }catch(err){
        res.status(500).json({message:"Error Deleting Hotel"})
    }
}