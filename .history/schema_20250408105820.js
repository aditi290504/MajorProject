const joi = require("joi");

const listingSchema = joi.object({
    listing : joi
}).required();