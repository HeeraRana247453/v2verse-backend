const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Conversation = require("../../model/conversation");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleGetSellerConversation = catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  });

  module.exports = handleGetSellerConversation;