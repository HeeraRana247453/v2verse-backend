const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Event = require("../../model/event");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleAdminGetAllEvents = catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({createdAt: -1,});
      res.status(201).json({
        success: true,
        events,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleAdminGetAllEvents;