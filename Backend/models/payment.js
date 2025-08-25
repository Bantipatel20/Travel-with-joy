
const mongoose = require("mongoose")

exports.paymetnschema = new mongoose.Schema({
    bookingid:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    method:{
        type:String,
        required:true,
    },
    transactionid:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    }
})