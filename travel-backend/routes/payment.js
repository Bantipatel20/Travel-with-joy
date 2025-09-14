import express from 'express';
import { createpayment,getallpayment } from '../controllers/payment.js';
import { adminonly,auth } from '../middlewares/auth.js';

const router = express.Router();

router.get("/",auth,adminonly ,getallpayment);
router.post("/",auth,createpayment);


export default router;
