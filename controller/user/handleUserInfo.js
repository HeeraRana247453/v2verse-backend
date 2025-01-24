const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const User = require("../../model/user");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleUserInfo = catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  
  module.exports = handleUserInfo;