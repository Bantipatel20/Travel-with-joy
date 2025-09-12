import express from "express";
import connectdb  from "./config/db.js";
import dotenv from "dotenv";



dotenv.config();

const app = express();

// connect to database
connectdb();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
