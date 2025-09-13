import mongoose from "mongoose";
import destination from "./destination";

const packageschema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String
        },
        price:{
            type:String,
            required:true
        },
        destinationid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Destination",
            required:true
        },
        hotelid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hotel",
            required:true
        },
        transportid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Transport",
            required:true
        },
        seatsAvailable:{
            type:Number,
            default:0
        }
    }
)

export default mongoose.model("Package",packageschema);