const mongoose = require("mongoose");
require("dotenv").config();

const connectiondb = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ DB connection successful"))
    .catch((err) => {
        console.error("❌ DB connection error:", err.message);
        process.exit(1); // Exit the app if DB fails to connect
    });
};

module.exports = connectiondb;
