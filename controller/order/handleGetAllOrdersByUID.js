const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Order = require("../../model/order");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleGetAllOrdersByUID  = catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({createdAt: -1,});

      res.status(200).json({
        success: true,
        orders,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleGetAllOrdersByUID;