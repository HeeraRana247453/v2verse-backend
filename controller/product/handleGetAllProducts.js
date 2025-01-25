const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Product = require("../../model/product");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleGetAllProducts = catchAsyncErrors(async (req, res, next) => {
    try {
      res.send("making request to database");
      const products = await Product.find().sort({ createdAt: -1 });

      res.send(`These are products:-- ${products}`);
      res.status(201).json({
        success: true,
        products,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleGetAllProducts;