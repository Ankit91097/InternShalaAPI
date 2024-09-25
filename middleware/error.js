exports.generatedErrors=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    res.status(statusCode).json({
        message:err.message,
        name:err.name
    })//err ko dikhane ke liye
}