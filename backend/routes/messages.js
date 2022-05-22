const { Message, validateMessage } = require("../models/message");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

// Post a message
// http://localhost:3007/api/messages
router.post("/", async (req, res) => {
  try {
    const { error } = validateMessage(req.body);
    if (error) return res.status(400).send(error);
    let newMessage = await new Message(req.body);
    await newMessage.save();
    return res.status(201).send(newMessage);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Get all messages
// http://localhost:3007/api/messages
router.get("/", async (req, res) => {
  try {
    // console.log(req.message);
    const messages = await Message.find();
    if (!messages) return res.status(400).send(`No messages to show!`);
    return res.send(messages);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// Get all messages from single user
// http://localhost:3007/api/messages/:userId
router.get("/:userId", async (req, res) => {
  try {
    // console.log(req.message);
    const messages = await Message.find({ userId: req.params.userId });
    if (!messages) return res.status(400).send(`No messages to show!`);
    return res.send(messages);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT an existing message
// http://localhost:3007/api/messages/:messageId
router.put("/:messageId", async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      { _id: req.params.messageId },
      req.body, {new: true}
    );
    console.log(JSON.stringify(req.body))
    if (!message) return res.status(400).send(`No message to show!`);
    return res.send(message);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE a single message from the database
// http://localhost:3007/api/messages/:messageId
router.delete("/:messageId", [admin], async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message)
      return res
        .status(400)
        .send(`message with id ${req.params.messageId} does not exist!`);
    await Message.remove();
    return res.send(message);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
