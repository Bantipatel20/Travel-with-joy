export const errorhandler = (err,req,res,next)=>{
    console.log(err.stack);
    res.status(err.statuscode || 500).json({
        message: err.message || "Server error"
    });
};