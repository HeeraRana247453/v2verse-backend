const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Event = require("../../model/event");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleGetAllEventsShop = catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  });

  module.exports = handleGetAllEventsShop;