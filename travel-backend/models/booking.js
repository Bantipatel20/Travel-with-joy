import mongoose from "mongoose";

const bookingschema = new mongoose.Schema(
    {
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        packageid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Package",
            required:true
        },
        status:{
            type:String,
            enum:["pending","confirmed","cancelled"],
            default:"pending"
        },
        bookingdate:{
            type:Date,
            default:Date.now()
        },
        paymentstatus:{
            type:String,
            enum:["unpaid","paid"],
            default:"unpaid"
        },
        amount:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Booking",bookingschema);