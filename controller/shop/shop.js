const express = require("express");
const { isSeller, isAdmin, isAuthenticated } = require("../../middleware/auth");
const handleCreateShop = require("./handleCreateShop");
const handleActivationShop = require("./handleActivationShop");
const handleLoginShop = require("./handleLoginShop");
const handleLoadShop = require("./handleLoadShop");
const handleLogoutShop = require("./handleLogoutShop");
const handleGetShopInfo = require("./handleGetShopInfo");
const handleUpdateShopDP = require("./handleUpdateShopDP");
const handleUpdateSellerInfo = require("./handleUpdateSellerInfo");
const handleUpdateSellerPaymentMethod = require("./handleUpdateSellerPaymentMethod");
const handleDeletePaymentMethod = require("./handleDeletePaymentMethod");
const handleGetAllSellers = require("./handleGetAllSellers");
const handleDeleteSeller = require("./handleDeleteSeller");


const router = express.Router();

// create shop
router.post("/create-shop", handleCreateShop);

// activate user
router.post("/activation",handleActivationShop);

// login shop
router.post("/login-shop",handleLoginShop);

// load shop
router.get("/getSeller", isSeller, handleLoadShop);

// log out from shop
router.get("/logout",handleLogoutShop);

// get shop info
router.get("/get-shop-info/:id", handleGetShopInfo);

// update shop profile picture
router.put("/update-shop-avatar", isSeller, handleUpdateShopDP);

// update seller info
router.put("/update-seller-info", isSeller, handleUpdateSellerInfo);

// all sellers --- for admin
router.get("/admin-all-sellers", isAuthenticated, isAdmin("Admin"), handleGetAllSellers);

// delete seller ---admin
router.delete("/delete-seller/:id", isAuthenticated, isAdmin("Admin"), handleDeleteSeller);

// update seller withdraw methods --- sellers
router.put("/update-payment-methods", isSeller, handleUpdateSellerPaymentMethod);

// delete seller withdraw merthods --- only seller
router.delete("/delete-withdraw-method/", isSeller, handleDeletePaymentMethod);

module.exports = router;