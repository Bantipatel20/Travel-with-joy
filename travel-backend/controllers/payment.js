import payment from "../models/payment.js";
import Payment from "../models/payment.js";
import { validationResult } from "express-validator";  

export const getallpayment = async(req ,res)=>{
    try{
        const payment = await Payment.find();
        res.json(payment);
    }catch(err){
        res.status(500).json("Error Fetching Payment");
    }
}

export const createpayment = async(req ,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }
    try{
        const {bookingid,amount,method,transactionid,date} = req.body;
        const payment = await Payment.create({bookingid,amount,method,transactionid,date});
        res.status(201).json(payment);
    }catch(err){
        res.status(500).json("Error Create Payment");
    }
}