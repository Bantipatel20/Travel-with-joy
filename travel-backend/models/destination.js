
import mongoose from "mongoose";

const  destinationschema  = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            index:true
        },
        location:{
            type:String,
            required:true,    
        },
        description:{
            type:String
        },
        images:[String],
        pricerange:{
            min:Number,
            max:Number
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Destination",destinationschema);