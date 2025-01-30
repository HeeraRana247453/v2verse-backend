const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");



const handleLogoutUser = catchAsyncErrors(async(req,res,next)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now(0)),
            httpOnly: true
        });
        res.status(201).json({
            success:true,
            message:"Log out successful!"
        });
    }
    catch(error){
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = handleLogoutUser;