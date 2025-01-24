const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Product = require("../../model/product");
const ErrorHandler = require("../../utils/ErrorHandler");
const cloudinary = require("cloudinary");


const handleDeleteProduct = catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }    

      for (let i = 0; product.images.length > i; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
    
      await Product.deleteOne({ _id: req.params.id });

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  });

  module.exports = handleDeleteProduct;