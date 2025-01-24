const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const User = require("../../model/user");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleUpdateUserAddresses = catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find((address) => address.addressType === req.body.addressType );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find((address) => address._id === req.body._id);

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } 
      else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleUpdateUserAddresses;