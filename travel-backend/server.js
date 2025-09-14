import express from "express";
import connectdb from "./config/db.js";
import serverless from "serverless-http";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

// Routes
import authroutes from './routes/auth.js';
import destinationroutes from './routes/destination.js';
import hotelroutes from './routes/hotel.js';
import bookingroutes from "./routes/booking.js";
import transportroutes from "./routes/transport.js";
import packageroutes from './routes/package.js';
import paymentroutes from "./routes/payment.js";

// Middleware
import { errorhandler } from "./middlewares/errorhandler.js";

dotenv.config();

const app = express();

// Connect to database with error handling
const initializeDatabase = async () => {
  try {
    await connectdb();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    // Don't exit in serverless environment
  }
};

// Initialize database connection
initializeDatabase();

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('combined'));
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Body parsing middleware with larger limits for file uploads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authroutes);
app.use('/api/destination', destinationroutes);
app.use('/api/hotel', hotelroutes);
app.use('/api/transport', transportroutes);
app.use("/api/package", packageroutes);
app.use("/api/booking", bookingroutes);
app.use("/api/payment", paymentroutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🌍 Travel Management System Backend is Running!",
    version: "1.0.0",
    status: "active"
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl
  });
});

// Error handler (must be last)
app.use(errorhandler);

export default serverless(app);
