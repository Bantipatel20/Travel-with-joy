import express from 'express';
import { createbooking,getallbooking,updatebooking,deletebooking } from '../controllers/booking.js';
import { bookingValidator } from '../utils/validators.js';
import { adminonly, auth } from '../middlewares/auth.js';

const router = express.Router();

router.get("/",auth,adminonly,getallbooking);
router.post("/",auth,bookingValidator,createbooking);
router.put("/:id",auth,bookingValidator,updatebooking);
router.delete("/:id",auth,bookingValidator,deletebooking)

export default router;