const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: { type: String, maxLength: 50, default: "" },
  userName: {type: String, unique: true,required:true,minLength:4, maxLength:255},
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  password: { type: String, required: true, minLength: 8, maxLength: 1024 },
  streetAddressLine1: {type: String, required: true, minLength:5,maxLength:255},
  streetAddressLine2: {type:String},
  state: {type: String, required:true,minLength:2,maxLength:255},
  zipCode: {type: String,required:true,minLength:5,maxLength:10},
  image: {type: String, default:""},
  admin: {type: Boolean, default: false}
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        userName: this.userName,
        email: this.email,
        streetAddressLine1: this.streetAddressLine1,
        streetAddressLine2: this.streetAddressLine2,
        state: this.state,
        zipCode: this.zipCode,
        admin: this.admin,
    },
    process.env.JWT_SECRET)
}

const validateUser = (user) => {
    const schema = Joi.object({
      name: Joi.string().max(50),
      email: Joi.string().min(2).max(255).required().email(),
      password: Joi.string().min(8).max(1024).required(),
      image: Joi.string(),
      userName: Joi.string(4).required(),
      streetAddressLine1: Joi.string().minLength(5).maxLength(255).required(),
      state: Joi.string().minLength(2).maxLength(255).required(),
      zipCode: Joi.string().minLength(5).maxLength(10).required(),
      admin: Joi.boolean(),
      
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