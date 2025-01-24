const Event = require("../../model/event");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleGetAllEvents =  async (req, res, next) => {
    try {
      const events = await Event.find();
      res.status(201).json({
        success: true,
        events,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }

  module.exports = handleGetAllEvents;