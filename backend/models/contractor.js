const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const contractorSchema = mongoose.Schema({
  name: { type: String, maxLength: 50, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  businessName: { type: String, minLength: 5, maxLength: 255, default: "" },
  password: { type: String, required: true, minLength: 8, maxLength: 1024 },
  streetAddressLine1: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  streetAddressLine2: { type: String },
  city: { type: String, minLength: 2, maxLength: 255, required: true },
  state: { type: String, required: true, minLength: 2, maxLength: 255 },
  zipCode: { type: String, required: true, minLength: 5, maxLength: 10 },
  image: { type: String, default: "" },
  admin: { type: Boolean, default: false },
  reviewIds: { type: Array, default: [] },
});

contractorSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      businessName: this.businessName,
      streetAddressLine1: this.streetAddressLine1,
      streetAddressLine2: this.streetAddressLine2,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      admin: this.admin,
      reviewIds: this.reviewIds,
    },
    process.env.JWT_SECRET
  );
};

const validatecontractor = (contractor) => {
  const schema = Joi.object({
    name: Joi.string().max(50),
    email: Joi.string().min(2).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
    businessName: Joi.string().min(5).max(255),
    image: Joi.string(),
    streetAddressLine1: Joi.string().min(5).max(255).required(),
    streetAddressLine2: Joi.string(),
    city: Joi.string().min(2).max(255).required(),
    state: Joi.string().min(2).max(255).required(),
    zipCode: Joi.string().min(5).max(10).required(),
    admin: Joi.boolean(),
    reviewIds: Joi.array().items(Joi.string()),
  });
  return schema.validate(contractor);
};

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(req);
};

const contractor =
  mongoose.models.contractor || mongoose.model("contractor", contractorSchema);
module.exports.contractor = contractor;
module.exports.contractorSchema = contractorSchema;
module.exports.validatecontractor = validatecontractor;
module.exports.validateLogin = validateLogin;
