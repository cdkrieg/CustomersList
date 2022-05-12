const mongoose = require('mongoose')
const Joi = require('joi')

const reviewSchema = mongoose.Schema({
    title: {type: String, minlength: 8, maxlength:255, required: true},
    body: {type: String, minLength:50, maxLength: 2048, required: true},
    image: {type:String, default:""},
    dateAdded: {type: Date, default: Date.now()},
})

const validateReview = (review) => {
    const schema = Joi.object({
        title: Joi.string().min(8).max(255).required(),
        body: Joi.string().minLength(50).maxLength(2048).required(),
        image: Joi.string(),
    })
    return schema.validate(review)
}

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema)
module.exports.Review = Review
module.exports.reviewSchema = reviewSchema
module.exports.validateReview = validateReview