
const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","client"]
    }
})

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

module.exports = mongoose.model("User",userschema);
module.exports = mongoose.model("Destination",destinationschema);