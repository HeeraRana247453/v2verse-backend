const express = require("express");
const { isSeller, isAuthenticated } = require("../../middleware/auth");
const handleCreateNewConversation = require("./handleCreateNewConversation");
const handleGetSellerConversation = require("./handleGetSellerConversion");
const handleGetUserConversation = require("./handleGetUserConversation");
const handleUpdateLastMessage = require("./handleUpdateLastMessage");


const router = express.Router();

// create a new conversation
router.post("/create-new-conversation",handleCreateNewConversation);

// get seller conversations
router.get("/get-all-conversation-seller/:id",isSeller,handleGetSellerConversation);

// get user conversations
router.get("/get-all-conversation-user/:id",isAuthenticated,handleGetUserConversation);

// update the last message
router.put("/update-last-message/:id",handleUpdateLastMessage);

module.exports = router;