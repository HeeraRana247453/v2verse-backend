const catchAsyncErrors = require("../../middleware/catchAsyncErrors.js");
const User = require("../../model/user.js");
const ErrorHandler = require("../../utils/ErrorHandler");
const sendToken = require("../../utils/sendUserTokenCookie.js");



const handleLoginUser = catchAsyncErrors(async(req,res,next)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return next(new ErrorHandler("Please provide the fields!",400));
        }

        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("User doesn't exists!",400));
        }

        // validation
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return next(new ErrorHandler("Please provide the correct information",400));
        }

        sendToken(user,201,res);
    }
    catch(error){
        return next(new ErrorHandler(error.message,500));
    }
});

module.exports = handleLoginUser;