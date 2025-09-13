import mongoose  from "mongoose";

const hotelschema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        location:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        rating:{
            type:Number,
            min:0,
            max:5
        },
        availableroom:{
            type:Number,
            default:0
        },
        images:[String]
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Hotel",hotelschema);