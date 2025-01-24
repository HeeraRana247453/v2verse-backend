const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const User = require("../../model/user");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleDeleteUserAddress = catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleDeleteUserAddress;