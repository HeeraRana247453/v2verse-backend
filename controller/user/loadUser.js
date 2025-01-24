const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const User = require("../../model/user");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleLoadUser = catchAsyncErrors(async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return next(new ErrorHandler("User not found",404));
        }
        res.status(200).json({
            success:true,
            user,
        });
    }
    catch(error){
        return next(new ErrorHandler(error.message,500));
    }
})

module.exports = handleLoadUser;