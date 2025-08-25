
const mongoose = require("mongoose")

exports.hotelschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
    },
    availableroom:{
        type:Number,
    }
})

module.exports = mongoose.model("Hotel",hotelschema);