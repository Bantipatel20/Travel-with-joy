import express from "express";
import connectdb  from "./config/db.js";
import authroutes from './routes/auth.js'
import dotenv from "dotenv";
import { errorhandler } from "./middlewares/errorhandler.js";
import destinationroutes from './routes/destination.js';
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


app.use(errorhandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
