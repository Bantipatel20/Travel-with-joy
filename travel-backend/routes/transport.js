import { getalltransport,createtransport,updatetransport,deletetransport } from "../controllers/transport.js";
import { auth,adminonly } from "../middlewares/auth.js";
import express, { Router } from 'express';

const router = express.Router();

router.get('/',getalltransport);
router.post('/',auth,adminonly,createtransport);
router.put('/:id',auth,adminonly,updatetransport);
router.delete('/:id',auth,adminonly,deletetransport);

export default router;
