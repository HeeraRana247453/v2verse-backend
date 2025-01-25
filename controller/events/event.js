const express = require("express");
const handleCreateEvent = require("./handleCreateEvent");
const handleGetAllEvents = require("./handleGetAllEvents");
const handleGetAllEventsShop = require("./handleGetAllEventsShop");
const handleDeleteEvent = require("./handleDeleteEvent");
const handleAdminGetAllEvents = require("./handleAdminGetAllEvents");
const { isAuthenticated, isAdmin, isSeller } = require("../../middleware/auth");


const router = express.Router();

// create event
router.post("/create-event",isSeller, handleCreateEvent);

// get all events
router.get("/get-all-events",handleGetAllEvents);

// get all events of a shop
router.get("/get-all-events/:id", handleGetAllEventsShop);

// delete event of a shop
router.delete("/delete-shop-event/:id", handleDeleteEvent);

// all events --- for admin
router.get("/admin-all-events", isAuthenticated, isAdmin("Admin"), handleAdminGetAllEvents);

module.exports = router;