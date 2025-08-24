const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");

const handleLogoutShop = catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(0),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",// Use 'None' for production, 'Lax' for development,
        secure: process.env.NODE_ENV === "production",
        path: "/", 
      });
      res.status(200).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleLogoutShop;