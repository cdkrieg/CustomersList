const mongoose = require("mongoose");
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  body: { type: String, minlength: 2, maxlength: 255, required: true },
  read: { type: Boolean },
  dateSent: { type: Date, default: Date.now() },
  dateRead: { type: Date },
  reviewId: { type: String, required: true },
  flagged: { type: Boolean, default: false },
});

const validateMessage = (message) => {
  const schema = Joi.object({
    senderId: Joi.string().required(),
    receiverId: Joi.string().required(),
    body: Joi.string().min(2).max(255).required(),
    reviewId: Joi.string().required(),
    flagged: Joi.boolean(),
  });
  return validateMessage(message);
};

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
module.exports.Message = Message;
module.exports.messageSchema = messageSchema;
module.exports.validateMessage = validateMessage;
