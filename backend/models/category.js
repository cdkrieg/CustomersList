const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
    category: {type: Array, default: ["Handyman", "Windows and Doors", "Landscaping", "Plumbing", "Remodeling", "Concrete/Asphalt", "Electrical", "Other"]}
})

const validateCategory = (category) => {
    const schema = Joi.object({
        category: Joi.array().items(Joi.string())
    })
    return schema.validate(category)
}

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)
module.exports.Category = Category
module.exports.categorySchema = categorySchema
module.exports.validateCategory = validateCategory