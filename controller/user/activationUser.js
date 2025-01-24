const jwt = require("jsonwebtoken");
const ErrorHandler = require("../../utils/ErrorHandler.js");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors.js");
const sendToken = require("../../utils/sendUserTokenCookie.js");
const User = require("../../model/user.js");


const handleActivationUser = catchAsyncErrors(async(req,res,next)=>{
    try{
        const {activation_token} = req.body;
        const newUser = jwt.verify(activation_token,process.env.ACTIVATION_TOKEN_SECRET);

        if(!newUser){
            return next(new ErrorHandler("Invalid token",400));
        }

        const {name,email,password, avatar} = newUser;

        const user = await User.findOne({email});
        if(user){
            return next(new ErrorHandler("User already exists",400));
        }

        const createdUser = await User.create({
            name,
            email,
            password,
            avatar
        });
        
        sendToken(createdUser,201,res);
    }
    catch(err){
        return next(new ErrorHandler(err.message,500));
    }
});

module.exports = handleActivationUser;