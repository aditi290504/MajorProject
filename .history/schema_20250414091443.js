const joi = require("joi");

const listingSchema = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        title: joi.string().required(),

    })
}).required();