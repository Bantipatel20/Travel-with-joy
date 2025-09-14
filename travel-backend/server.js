import express from "express";
import connectdb  from "./config/db.js";
import authroutes from './routes/auth.js'
import dotenv from "dotenv";
import { errorhandler } from "./middlewares/errorhandler.js";
import hotelroutes from './routes/hotel.js';
import bookingroutes from "./routes/booking.js";
import destinationroutes from './routes/destination.js';
import transportroutes from "./routes/transport.js";
import packageroutes from './routes/package.js';
import paymentroutes from "./routes/payment.js";
import cors from 'cors';
import morgan from "morgan";
import helmet from 'helmet';


dotenv.config();
const app = express();

// connect to database
connectdb();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('common'));
app.use(helmet());

//routes
app.use('/api/auth',authroutes);
app.use('/api/destination',destinationroutes);
app.use('/api/hotel',hotelroutes);
app.use('/api/transport',transportroutes);
app.use("/api/package",packageroutes);
app.use("/api/booking",bookingroutes);
app.use("/api/payment",paymentroutes);

//error handler
app.use(errorhandler);

const port = process.env.PORT || 5000;

export default serverless(app);
