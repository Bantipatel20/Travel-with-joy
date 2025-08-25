
const mongoose = require("mongoose")

exports.bookingschema = new  mongoose.Schema({
    userid:{
        type:String,
        require:true,
    },
    packageid:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    bookingdate:{
        type:Date,
        required:true,
    },
    paymentstatus:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Booking",bookingschema);