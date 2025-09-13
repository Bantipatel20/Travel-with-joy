    import mongoose  from "mongoose";
    import dotenv from "dotenv";
    dotenv.config();

     const connectdb = ()=>{

        mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true
        })
        .then(console.log("Database Connected Successfully"))
        .catch((err)=>{console.log("Error While Connected With DB "+ err);
            process.exit(1);
        })
    }
     
    export default connectdb;