const {
  contractor,
  validateLogin,
  validatecontractor,
} = require("../models/contractor");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");

//POST register a new contractor
router.post("/", [admin], async (req, res) => {
  try {
    const { error } = validatecontractor(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let contractor = await contractor.findOne({ email: req.body.email });
    if (contractor)
      return res
        .status(400)
        .send(
          `Email ${req.body.email} already exists in the database. Please login or enter a new email address!`
        );

    const salt = await bcrypt.genSalt(10);
    contractor = new contractor({
      name: req.body.name,
      businessName: req.body.businessName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      streetAddressLine1: req.body.streetAddressLine1,
      streetAddressLine2: req.body.streetAddressLine2,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    });

    await contractor.save();
    const token = contractor.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: contractor._id,
        contractorName: contractor.contractorName,
        email: contractor.email,
        streetAddressLine1: contractor.streetAddressLine1,
        streetAddressLine2: contractor.streetAddressLine2,
        city: contractor.city,
        state: contractor.state,
        zipCode: contractor.zipCode,
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

    let contractor = await contractor.findOne({ email: req.body.email });
    if (!contractor) return res.status(400).send(`Invalid email or password.`);

    const validPassword = await bcrypt.compare(
      req.body.password,
      contractor.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = contractor.generateAuthToken();
    return res.send(token);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});
// Get all contractors
router.get("/", [auth], async (req, res) => {
  try {
    const contractors = await contractor.find();
    return res.send(contractors);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE a single contractor from the database
router.delete("/:contractorId", [auth, admin], async (req, res) => {
  try {
    const contractor = await contractor.findByIdAndDelete(
      req.params.contractorId
    );
    if (!contractor)
      return res
        .status(400)
        .send(`contractor with id ${req.params.contractorId} does not exist!`);
    return res.send(contractor);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Get property of contractor
router.get("/:contractorId", async (req, res) => {
  try {
    const contractors = await contractor.findById(req.params.contractorId);
    if (contractors) {
      return res.send(contractors);
    } else {
      return res.status(400).send("Error getting contractor");
    }
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Update property of contractor
router.put("/update/:contractorId", async (req, res) => {
  try {
    const contractors = await contractor.findByIdAndUpdate(
      { _id: req.params.contractorId },
      req.body.updates,
      { new: true }
    );

    return res.status(200).send(contractors);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
router.put(
  "/updateImage/:contractorId",
  fileUpload.single("image"),
  async (req, res) => {
    try {
      const contractors = await contractor.findByIdAndUpdate(
        { _id: req.params.contractorId },
        { image: req.file.filename },
        { new: true }
      );

      return res.status(200).send(contractors);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  }
);

module.exports = router;
