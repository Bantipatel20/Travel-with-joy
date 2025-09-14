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
connectdb();

// Middlewares
app.use(cors());
app.use(morgan('common'));
app.use(helmet());

// **Only parse JSON for non-file routes**
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use('/api/auth', authroutes);
app.use('/api/destination', destinationroutes);
app.use('/api/hotel', hotelroutes);
app.use('/api/transport', transportroutes);
app.use("/api/package", packageroutes);
app.use("/api/booking", bookingroutes);
app.use("/api/payment", paymentroutes);

// Root
app.get("/", (req, res) => res.send("🌍 Travel Management System Backend is Running!"));

// Error handler (moved to the end)
app.use(errorhandler);

export default serverless(app);
