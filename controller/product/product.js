const express = require("express");
const { isSeller, isAuthenticated, isAdmin  } = require("../../middleware/auth");

const handleCreateProduct = require("./handleCreateProduct");
const handleGetAllProductsShopId = require("./handleGetAllProductsShopId");
const handleDeleteProduct = require("./handleDeleteProduct");
const handleGetAllProducts = require("./handleGetAllProducts");
const handleCreateNewReview = require("./handleCreateNewReview");



const router = express.Router();
// create product
router.post("/create-product", handleCreateProduct);

// get all products of a shop
router.get("/get-all-products-shop/:id", handleGetAllProductsShopId);

// delete product of a shop
router.delete("/delete-shop-product/:id",isSeller, handleDeleteProduct);

// get all products
router.get("/get-all-products", handleGetAllProducts);

// review for a product
router.put("/create-new-review", isAuthenticated, handleCreateNewReview);

// all products --- for admin
router.get("/admin-all-products", isAuthenticated, isAdmin("Admin"), handleGetAllProducts);

module.exports = router;