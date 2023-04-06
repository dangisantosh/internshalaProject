const ErrorHander = require('../utils/errorhander');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
    

    //Cast error - wrong MongoDB error
    if(err.name == "castError0"){
       const message = `Resource not found. Invalid: ${err.path}`;
       err = new ErrorHander(message, 400)
    }


    res.status(err.statusCode).json({
        success: false,
        // error: err.stack
        message: err.message
    });
};
