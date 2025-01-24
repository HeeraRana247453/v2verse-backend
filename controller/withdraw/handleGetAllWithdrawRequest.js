const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Withdraw = require("../../model/withdraw");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleGetAllWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleGetAllWithdrawRequest;