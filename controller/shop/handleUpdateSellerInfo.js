const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Shop = require("../../model/shop");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleUpdateSellerInfo = catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);
      if (!shop) {
        return next(new ErrorHandler("Seller not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;
      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleUpdateSellerInfo;