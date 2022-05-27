const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: { type: String, maxLength: 50, default: "" },
  userName: {
    type: String,
    unique: true,
    required: true,
    minLength: 4,
    maxLength: 255,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  password: { type: String, required: true, minLength: 8, maxLength: 1024 },
  streetAddressLine1: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  streetAddressLine2: { type: String, default: "", minLength:0 },
  city: { type: String, minLength: 2, maxLength: 255, required: true },
  state: { type: String, required: true, minLength: 2, maxLength: 255 },
  zipCode: { type: String, required: true, minLength: 5, maxLength: 10 },
  image: { type: String, default: "" },
  admin: { type: Boolean, default: false },
  dateAdded: {type: Date, default: Date.now()},
  coordinates: [{type:String}]
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      userName: this.userName,
      email: this.email,
      streetAddressLine1: this.streetAddressLine1,
      streetAddressLine2: this.streetAddressLine2,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      admin: this.admin,
      image: this.image,
      coordinates: this.coordinates
    },
    process.env.JWT_SECRET
  );
};

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
    userName: Joi.string().min(4).max(255).required(),
    streetAddressLine1: Joi.string().min(5).max(255).required(),
    streetAddressLine2: Joi.string().min(0),
    city: Joi.string().min(2).max(255).required(),
    state: Joi.string().min(2).max(255).required(),
    zipCode: Joi.string().min(5).max(10).required(),
    admin: Joi.boolean().default(false),
    coordinates: Joi.array().items(Joi.string()),
  });
  return schema.validate(user);
};

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(req);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
