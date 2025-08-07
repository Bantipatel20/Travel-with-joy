
const express = require("express")
const app = express();

require("dotenv").config()

app.use(express.json());

const connectiondb = require("./config/database");
connectiondb();

const user = require("./routes/User");
app.use("/api/v1",user);

PORT  = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})