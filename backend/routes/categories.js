const { Category, validateCategory } = require("../models/category");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

// Post a categories
// http://localhost:3010/api/categories
router.post("/", async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error);
    let newCategory = await new Category(req.body);
    await newCategory.save();
    return res.status(201).send(newCategory);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Get all categories
// http://localhost:3010/api/categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findOne();
    if (!categories) return res.status(400).send(`No ctegories to show!`);
    return res.send(categories);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT add a category to categories
// http://localhost:3010/api/add/:postId
router.put("/add/:categoryId", [auth, admin], async (req, res) => {
  try {
    const categories = await Category.updateOne(
      { _id: req.params.categoryId },
      { $addToSet: { categories: req.body.categories } },
      { new: true }
    );
    if (!categories) return res.status(400).send(`No categories to show!`);
    return res.send(categories);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT remove a category from categories
// http://localhost:3010/api/remove/:postId
router.put("/remove/:categoryId", [auth, admin] ,async (req, res) => {
  try {
    const categories = await Category.updateOne(
      { _id: req.params.categoryId },
      { $pull: { categories: req.body.categories } },
      { new: true }
    );
    if (!categories) return res.status(400).send(`No categories to show!`);
    return res.send(categories);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
router.delete("/:categoryid") , [auth, admin], async (req, res) => {
  try {
    const categories = await Category.findByIdAndDelete({_id: req.params.categoryId})
    if (!categories) return res.status(400).send(`Category not found`)
    return res.send(categories)
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
  }
}

module.exports = router;
