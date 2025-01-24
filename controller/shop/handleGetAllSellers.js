const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Shop = require("../../model/shop");
const ErrorHandler = require("../../utils/ErrorHandler");

const handleGetAllSellers = catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  
  module.exports = handleGetAllSellers;