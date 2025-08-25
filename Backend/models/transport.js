const mongoose = require("mongoose")


exports.transportschema = new mongoose.Schema({
    type:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    availabilty:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.Schema("Transport" , transportschema);