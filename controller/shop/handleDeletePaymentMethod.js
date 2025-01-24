const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Shop = require("../../model/shop");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleDeletePaymentMethod = catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);
      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;
      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleDeletePaymentMethod;