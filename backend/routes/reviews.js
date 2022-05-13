const { Review, validateReview } = require("../models/review");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");

// Post a review
// http://localhost:3007/api/review
router.post("/", async (req, res) => {
  try {
    const { error } = validateReview(req.body);
    if (error) return res.status(400).send(error);
    let newReview = await new Review(req.body);
    await newReview.save();
    return res.status(201).send(newreview);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Get all reviews
// http://localhost:3007/api/reviews
router.get("/", async (req, res) => {
  try {
    // console.log(req.review);
    const reviews = await Review.find();
    if (!reviews) return res.status(400).send(`No reviews to show!`);
    return res.send(reviews);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// Get all reviews from single user
// http://localhost:3007/api/reviews/:userId
router.get("/:userId", async (req, res) => {
  try {
    // console.log(req.review);
    const reviews = await Review.find({ userId: req.params.userId });
    if (!reviews) return res.status(400).send(`No reviews to show!`);
    return res.send(reviews);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT an existing review
// http://localhost:3007/api/reviews/:reviewId
router.put("/:reviewId", [auth, admin], async (req, res) => {
  try {
    const review = await Review.UpdateOne(
      { _id: req.params.reviewId },
      req.body
    );
    if (!review) return res.status(400).send(`No review to show!`);
    return res.send(review);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE a single review from the database
// http://localhost:3007/api/:reviewId
router.delete("/:reviewId", [admin], async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review)
      return res
        .status(400)
        .send(`review with id ${req.params.reviewId} does not exist!`);
    await Review.remove();
    return res.send(review);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
router.put(
  "/updateImage/:reviewId",
  fileUpload.single("image"),
  async (req, res) => {
    try {
      const users = await Review.findByIdAndUpdate(
        { _id: req.params.reviewId },
        { image: req.file.filename },
        { new: true }
      );

      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  }
);

module.exports = router;
