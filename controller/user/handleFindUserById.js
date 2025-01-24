const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const User = require("../../model/user");
const ErrorHandler = require("../../utils/ErrorHandler");

const handleFindUserById = catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleFindUserById;