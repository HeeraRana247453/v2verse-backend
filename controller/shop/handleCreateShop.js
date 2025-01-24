const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Shop = require("../../model/shop");
const ErrorHandler = require("../../utils/ErrorHandler");
const path = require("path");
const sendMail = require("../../utils/sendMail");
const cloudinary = require("cloudinary");
const { createActivationToken } = require("../../utils/createActivationToken");



const handleCreateShop = catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;
      const sellerEmail = await Shop.findOne({ email });
      if (sellerEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
      });
  
  
      const seller = {
        name: req.body.name,
        email: email,
        password: req.body.password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
      };
  
      const activationToken = createActivationToken(seller);
  
      const activationUrl = `${process.env.FRONTEND_SERVER}/seller/activation/${activationToken}`;  //this url will route to the frontend 'SellerActivationPage'
      
      try {
        await sendMail({
          email: seller.email,
          subject: "Activate your Shop",
          message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${seller.email} to activate your shop!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  });

  module.exports = handleCreateShop;