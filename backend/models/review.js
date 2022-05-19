const mongoose = require('mongoose')
const Joi = require('joi')

const reviewSchema = mongoose.Schema({
    title: {type: String, minlength: 8, maxlength:35, required: true},
    rating:{type: Number, default:0},
    body: {type: String, minLength:10, maxLength: 2048, required: true},
    image: {type:String, default:""},
    contractorName: {type: String, required: true},
    contractorPhone: {type: String, required: true},
    categoryOfService: {type: String, required: true}, 
    dateOfService: {type: Date, required: true},
    reviewer: {type: String, required: true}, // userName
    dateAdded: {type: Date, default: Date.now()},
})

const validateReview = (review) => {
    const schema = Joi.object({
        title: Joi.string().min(8).max(35).required(),
        body: Joi.string().min(10).max(2048).required(),
        rating: Joi.number(),
        contractorName: Joi.string().required(),
        contractorPhone: Joi.string().required(),
        categoryOfService: Joi.string().required(),
        dateOfService: Joi.date().required(),
        reviewer: Joi.string().required(),
        image: Joi.string(),
    })
    return schema.validate(review)
}

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema)
module.exports.Review = Review
module.exports.reviewSchema = reviewSchema
module.exports.validateReview = validateReview