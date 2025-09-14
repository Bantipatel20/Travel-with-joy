import { validationResult } from "express-validator";
import Transport from "../models/transport.js";

export const getalltransport = async(req,res)=>{
    try{
        const transport = await Transport.find();
        res.json(transport);
    }catch(err){
        res.status(500).json({
            message:"Error fetching transport"
        })
    }
}

export const createtransport = async(req ,res)=>{
    const error  = validationResult(req);

    if(!error.isEmpty()){
        res.status(400).json({error:error.array()});
    }
    try{
        const {type,company,price,availability,departureTime,arrivalTime} = req.body;

        const transport = new Transport({type,company,price,availability,departureTime,arrivalTime});

        await transport.save();

        res.status(201).json(transport);
    }catch(err){
        res.status(500).json({message:"Error Creating transport"});
    }
}

export const updatetransport = async(req,res)=>{
    try{
        const update = req.body;

        const transport = await Transport.findByIdAndUpdate(req.params.id,update,{new:true});

        res.json(transport);
    }catch(err){
        res.status(500).json({message:"Error Update Transport"})
    }
}

export const deletetransport = async(req,res)=>{
    try{
        await Transport.findByIdAndDelete(req.params.id);
        res.json({message:"Delete Transport"})
    }catch(err){
        res.status(500).json({message:"Error Delete Transport"});
    }
}