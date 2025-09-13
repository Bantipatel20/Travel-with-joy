import express from "express";
import { register,login,me } from "../controllers/authcontroller.js";
import { auth  } from "../middlewares/auth.js";
import { registerValidator, loginValidator } from "../utils/validators.js";

const router = express.Router();

router.post('/register',registerValidator,register)

router.post('/login',loginValidator,login)

router.get('/me',auth,me);

export default router;

