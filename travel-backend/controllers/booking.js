import Booking from '../models/booking.js';
import {validationResult}  from 'express-validator';

export const getallbooking = async(req,res)=>{
    try{
        const bookings = await Booking.find();
        res.json(bookings);
    }catch(err){
        res.status(500).json({message:"Error Fetching Booking"});
    }
}

export const createbooking = async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    } 
    try{
        const {userid,packageid,status,bookingdate,paymentstatus,amount} = req.body;
        const bookings = await Booking.create( {userid,packageid,status,bookingdate,paymentstatus,amount});
        res.status(201).json(bookings);
    }catch(err){
        res.status(500).json({message:"Error Create Booking"});
    }
}

export const updatebooking = async(req,res)=>{
    try{
        const update = await Booking.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(update);
    }catch(err){
        res.status(500).json({message:"Error Update Booking"});
    }
}

export const deletebooking = async(req,res)=>{
    try{
        await Booking.findByIdAndDelete(req.params.id);
        res.json({message:"Delete Booking"})
    }catch(err){
        res.status(500).json({message:"Error Delete Booking"});
    }
}