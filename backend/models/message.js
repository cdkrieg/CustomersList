const mongoose = require("mongoose");
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderUserName: {type: String, required: true},
  receiverId: { type: String, required: true },
  receiverUserName: {type: String, required: true},
  message: { type: String, minlength: 2, maxlength: 255, required: true },
  read: { type: Boolean, default: false },
  dateSent: { type: Date, default: Date.now() },
  dateRead: { type: Date },
  reviewId: { type: String, required: true },
  reviewTitle: {type: String, required: true},
  flagged: { type: Boolean, default: false },
});

const validateMessage = (message) => {
  const schema = Joi.object({
    senderId: Joi.string().required(),
    receiverId: Joi.string().required(),
    message: Joi.string().min(2).max(255).required(),
    reviewId: Joi.string().required(),
    senderUserName: Joi.string().required(),
    receiverUserName: Joi.string().required(),
    reviewTitle: Joi.string().required()
  });
  return schema.validate(message);
};

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
module.exports.Message = Message;
module.exports.messageSchema = messageSchema;
module.exports.validateMessage = validateMessage;
