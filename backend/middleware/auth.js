const ErrorHandler = require("../utils/errorHandlers");
const CatchAsyncError = require("./CatchAsyncError");
const jwt = require("jsonwebtoken");
const User=require("../models/userModel")

exports.isAuthenticatedUser= CatchAsyncError(async(req,res,next)=>{

    const {token}=req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to see the content",401));
    }

    const decodeData=jwt.verify(token,process.env.JWT_SECRET);

   req.user= await User.findById(decodeData.id);
   next();
});

exports.authorizeRoles=(...roles) =>{
    return (req,res,next)=>{

        if (!roles.includes(req.user.role)){
            return next(new ErrorHandler(`You (${req.user.role}) are not authorized to perform this action`,403));
        }
        next();
    }

}