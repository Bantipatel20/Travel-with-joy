import express from "express";
import { register,login,me } from "../controllers/authcontroller.js";
import { auth  } from "../middlewares/auth.js";
import { check } from "express-validator";

const router = express.Router();

router.post('/register',
    [
        check("name",'Name is required').notEmpty(),
        check("email","please add valid email").isEmail(),
        check("password","Please Password must be 6+ character").isLength({min:6})
    ],
    register
)

router.post('/login',
    [
        check("email","please add valid email").isEmail(),
        check("password" , "password must be required").exists()
    ],
    login
)

router.get('/me',auth,me);

export default router;

