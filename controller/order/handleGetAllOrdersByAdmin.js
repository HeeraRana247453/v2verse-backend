const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Order = require("../../model/order");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleGetAllOrdersByAdmin = catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleGetAllOrdersByAdmin;