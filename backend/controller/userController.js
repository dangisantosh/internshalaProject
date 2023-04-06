const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//User Registeration
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const{name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"This is Sample id",
            url:"profilepicurl"
        }
    })
    sendToken(user,201,res)
})

//User Login
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email, password} = req.body

    if(!email || !password){
        return next(new ErrorHander("Please enter Email and Password,400"))
    }
    
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401))
    }
    sendToken(user,200,res)

})