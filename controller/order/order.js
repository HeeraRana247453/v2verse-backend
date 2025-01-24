const express = require("express");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Order = require("../../model/order");
const ErrorHandler = require("../../utils/ErrorHandler");
const Shop = require("../../model/shop");
const Product = require("../../model/product");
const { isAuthenticated, isSeller, isAdmin  } = require("../../middleware/auth");
const handleCreateOrder = require("./handleCreateOrder");
const handleGetAllOrdersByUID = require("./handleGetAllOrdersByUID");
const handleGetAllOrdersBySellerId = require("./handleGetAllOrdersBySellerId");
const handleUpdateOrderStatus = require("./handleUpdateOrderStatus");
const handleOrderRefundById = require("./handleOrderRefundById");
const handleRefundSuccessBySellerId = require("./handleRefundSuccessBySellerId");
const handleGetAllOrdersByAdmin = require("./handleGetAllOrdersByAdmin");


const router = express.Router();

// create new order
router.post("/create-order",handleCreateOrder);

// get all orders of user
router.get("/get-all-orders/:userId", handleGetAllOrdersByUID);

// get all orders of seller
router.get("/get-seller-all-orders/:shopId", handleGetAllOrdersBySellerId);

// update order status for seller
router.put("/update-order-status/:id",isSeller, handleUpdateOrderStatus);

// give a refund ----- user
router.put("/order-refund/:id",handleOrderRefundById);

// accept the refund ---- seller
router.put("/order-refund-success/:id",isSeller,handleRefundSuccessBySellerId);

// all orders --- for admin
router.get("/admin-all-orders",isAuthenticated,isAdmin("Admin"),handleGetAllOrdersByAdmin);

module.exports = router;