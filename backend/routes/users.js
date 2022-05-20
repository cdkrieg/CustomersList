const { User, validateLogin, validateUser } = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");

//POST register a new user
router.post("/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send(
          `Email ${req.body.email} already exists in the database. Please login or enter a new email address!`
        );

    const salt = await bcrypt.genSalt(10);
    user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      streetAddressLine1: req.body.streetAddressLine1,
      streetAddressLine2: req.body.streetAddressLine2 || "",
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    });

    await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        streetAddressLine1: user.streetAddressLine1,
        streetAddressLine2: user.streetAddressLine2,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        admin: user.admin,
      });
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});


//POST a valid login attempt
router.post("/login", async (req, res) => {
    try {
      const { error } = validateLogin(req.body);
      if (error) return res.status(400).send(error.details[0].message);
  
      let user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send(`Invalid email or password.`);
  
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(400).send("Invalid email or password.");
  
      const token = user.generateAuthToken();
      return res.send(token);
    } catch (err) {
      return res.status(500).send(`Internal Server Error: ${err}`);
    }
  });
  // Get all users
router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      return res.send(users);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  });
  
  // DELETE a single user from the database
  router.delete("/:userId", [auth, admin], async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user)
        return res
          .status(400)
          .send(`User with id ${req.params.userId} does not exist!`);
      return res.send(user);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  });
  
  // Get property of user
  router.get("/:userId", async (req, res) => {
    try {
      const users = await User.findById(req.params.userId);
      if (users) {
        return res.send(users);
      } else {
        return res.status(400).send("Error getting user");
      }
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  });
  
  // Update property of user
  router.put("/update/:userId", async (req, res) => {
    try {
      const users = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        req.body.updates,
        { new: true }
      );
  
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  });
  router.put("/updateImage/:userId", fileUpload.single('image'),async (req, res) => {
    try {
      const users = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        {image: req.file.filename},
        { new: true }
      );
  
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  });
  
  module.exports = router;