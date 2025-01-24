const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Order = require("../../model/order");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleOrderRefundById = catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleOrderRefundById;