

const mongoose = require("mongoose");

require("dotenv").config();

const connectiondb = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("DB connection Successfully"))
    .catch((err)=>console.log("DB connection Error"))
}

module.exports = connectiondb;