const mongoose = require("mongoose");
const { type } = require("../schema");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    Comment : String,
    rating : {
        type: num
    }
})