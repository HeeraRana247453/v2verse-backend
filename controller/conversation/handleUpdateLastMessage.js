const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Conversation = require("../../model/conversation");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleUpdateLastMessage = catchAsyncErrors(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  });

  module.exports = handleUpdateLastMessage;