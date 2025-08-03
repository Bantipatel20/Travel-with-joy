
const express = require("express")
const app = express();

require("dotenv").config()

app.use(express.json());

const connectiondb = require("./config/database");
connectiondb();


PORT  = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})