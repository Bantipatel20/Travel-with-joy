

const mongoose = require("mongoose");

require("dotenv").config;

const connectiondb = ()=>{
    mongoose.connect(Process.env.MONGODB_URL,{
        useUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("DB connection Successfully"))
    .catch((err)=>console.log("DB connection Error"))
}

module.exports = connectiondb;