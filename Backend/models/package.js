
const mongoose = require("mongoose")
const destination = require("./destination")
const { translateAliases } = require("./user")

exports.packageschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    destinationid:{
        type:String,
        required:true,
    },
    hotelid:{
        type:String,
        required:true,
    },
    transportid:{
        type:String,
        required:true,
    }
})


module.exports = mongoose.model("Package",packageschema);