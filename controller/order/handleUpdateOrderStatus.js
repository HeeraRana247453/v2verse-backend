const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Order = require("../../model/order");
const Product = require("../../model/product");
const Shop = require("../../model/shop");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleUpdateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      // To Update the Product Stock and Sold_Out
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (obj) => {
          await updateProduct(obj._id, obj.qty);
        });
      }
      async function updateProduct(id, qty) {
        const product = await Product.findById(id);
        product.stock -= qty;
        product.sold_out += qty;
        await product.save({ validateBeforeSave: false });
      }

      // Update - Deliver date, Payment Info. status, seller available balance
      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const platformFee = order.totalPrice * .10;
        const afterDeliveryTotalAmount = order.totalPrice - platformFee;
        await updateSellerInfo(afterDeliveryTotalAmount);
      }
      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);
        seller.availableBalance = amount;
        await seller.save();
      }
      
      // Update order status
      order.status = req.body.status;
      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleUpdateOrderStatus;