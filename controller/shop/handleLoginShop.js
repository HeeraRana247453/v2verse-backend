const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Shop = require("../../model/shop");
const ErrorHandler = require("../../utils/ErrorHandler");
const sendShopToken = require("../../utils/sendShopTokenCookie");

const handleLoginShop = catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await Shop.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleLoginShop;