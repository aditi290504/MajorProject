const joi = require("joi");
const reviews = require("./models/reviews");

const listingSchema = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().allow(" ",null)
    })
}).required();

reviewSchema = joi.object({
    reviews: joi.object({
        rating : joi.number().required().min(1).max(5),
        comment : joi.string().required(),
    }).required()
})

module.exports = listingSchema;
module.exports.