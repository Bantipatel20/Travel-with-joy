const mongoose = require("mongoose");


exports.destinationschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    imageurl:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
})

module.exports = mongoose.model("Destination",destinationschema);