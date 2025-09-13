import mongoose from "mongoose";

const transportschema = new mongoose.Schema(
    {
        type:{
            type:String,
            required:true,
            enum:["flight","bus","train","car","minibus","cruise","other"]
        },
        company:{
            type:String,
            required:true,
            trim:true
        },
        price:{
            type:Number,
            required:true,
            min:0
        },
        availability:{
            type:Number,
            default:0,
            min:0
        },
        departureTime:{
            type:Date
        },
        arrivalTime:{
            type:Date,
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Transport",transportschema);