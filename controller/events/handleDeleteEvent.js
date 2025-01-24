const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Event = require("../../model/event");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleDeleteEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new ErrorHandler("Invalid event ID", 400));
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new ErrorHandler("Event is not found with this ID", 404));
    }

    // Validate event images
    if (!event.images || !Array.isArray(event.images)) {
      return next(new ErrorHandler("No images found for this event", 400));
    }

    // Delete all images associated with the event
    for (let i = 0; i < event.images.length; i++) {
      try {
        await cloudinary.uploader.destroy(event.images[i].public_id);
      } catch (err) {
        return next(new ErrorHandler("Failed to delete an image from Cloudinary", 500));
      }
    }

    // Delete the event itself
    await Event.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Failed to delete event", 400));
  }
});

module.exports = handleDeleteEvent;
