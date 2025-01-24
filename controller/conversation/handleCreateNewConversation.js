const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Conversation = require("../../model/conversation");
const ErrorHandler = require("../../utils/ErrorHandler");


const handleCreateNewConversation = catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;

      const isConversationExist = await Conversation.findOne({ groupTitle });

      if (isConversationExist) {
        const conversation = isConversationExist;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } 
    catch (error) {
      return next(new ErrorHandler(error.response.message), 500);
    }
  });

  module.exports = handleCreateNewConversation;