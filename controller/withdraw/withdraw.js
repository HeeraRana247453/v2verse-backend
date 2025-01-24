const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../../middleware/auth");
const handleWithdrawRequest = require("./handleWithdrawRequest");
const handleGetAllWithdrawRequest = require("./handleGetAllWithdrawRequest");
const handleUpdateWithdrawRequest = require("./handleUpdateWithdrawRequest");


const router = express.Router();

// create withdraw request --- only for seller
router.post("/create-withdraw-request",isSeller,handleWithdrawRequest);

// get all withdraws --- admnin
router.get("/get-all-withdraw-request",isAuthenticated,isAdmin("Admin"),handleGetAllWithdrawRequest);

// update withdraw request ---- admin
router.put("/update-withdraw-request/:id",isAuthenticated,isAdmin("Admin"),handleUpdateWithdrawRequest);

module.exports = router;