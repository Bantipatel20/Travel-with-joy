import express from 'express';
import { getalldestination,createdestination,updatedestination,deletedestination } from '../controllers/destination.js';
import { auth,adminonly } from '../middlewares/auth.js';
import { uploaddestination } from "../config/cloudinary.js"



const router = express.Router();

router.get('/',getalldestination);
router.post('/',auth,adminonly,uploaddestination.array('images',5),createdestination);
router.put('/:id',auth,adminonly,uploaddestination.array('images',5),updatedestination);
router.delete('/:id',auth,adminonly,deletedestination);

export default router;