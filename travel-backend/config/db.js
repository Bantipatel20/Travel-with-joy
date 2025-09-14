import mongoose from "mongoose";

let isConnected = false;

const connectdb = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    throw err;
  }
};

export default connectdb;
