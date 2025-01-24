const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const User = require("../../model/user");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleUpdateUserPassword = catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Cofirm password not matched!!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  
  module.exports = handleUpdateUserPassword;