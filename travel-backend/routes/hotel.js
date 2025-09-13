import { createhotel,getallhotel,deletehotel,updatehotel } from "../controllers/hotel.js";
import express from "express";
import { auth,adminonly } from "../middlewares/auth.js";
import { uploadhotel } from "../config/cloudinary.js";
import { hotelValidator } from "../utils/validators.js"

const router = express.Router();

router.get('/',getallhotel);
router.post('/',uploadhotel.array('images',5),hotelValidator,createhotel);
router.put('/:id',auth,adminonly,uploadhotel.array('images',5),hotelValidator,updatehotel);
router.delete("/:id",deletehotel);

export default router;