import mongoose, { mongo } from "mongoose";

const paymentschema = new mongoose.Schema(
    {
        bookingid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Booking",
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        method:{
            type:String
        },
        transactionid:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now()
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Payment",paymentschema);