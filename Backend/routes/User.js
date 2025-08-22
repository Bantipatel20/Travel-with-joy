
const express =require("express");
const router = express.Router();

const {login,signup} = require("../controllers/auth");
const {auth,isClient,isAdmin} = require("../middlewares/auth");

router.post("/signup",signup);
router.post("/login",login);

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the testing routes"
    })
})

router.get("/client",auth,isClient,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Client routes"
    })
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the admin routes"
    })
})
module.exports = router;