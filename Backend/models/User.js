

const mongoose =require("mongoose")


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

module.exports = mongoose.model("User", userschema);