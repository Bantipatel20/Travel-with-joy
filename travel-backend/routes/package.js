import { getallpackage,createallpackage,updatepackage,deletepackage } from "../controllers/package.js";
import express from "express";
import { packageValidator } from "../utils/validators.js";
import { auth,adminonly } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",getallpackage);
router.post("/",auth,adminonly,packageValidator,createallpackage);
router.put("/:id",auth,adminonly,packageValidator,updatepackage);
router.delete("/:id",auth,adminonly,packageValidator,deletepackage);

export default router;
