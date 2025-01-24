const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Product = require("../../model/product");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleGetAllProductsShopId = catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  });

  module.exports = handleGetAllProductsShopId;