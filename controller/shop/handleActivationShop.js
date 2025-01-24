const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Shop = require("../../model/shop");
const ErrorHandler = require("../../utils/ErrorHandler");
const sendShopToken = require("../../utils/sendShopTokenCookie");


const handleActivationShop = catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      
      const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller;

      let seller = await Shop.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }
      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

module.exports = handleActivationShop;