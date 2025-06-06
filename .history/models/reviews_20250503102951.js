const mongoose = require("mongoose");
const { type } = require("../schema");
const { number } = require("joi");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    Comment : String,
    rating : {
        type: Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    author : {
        
    }
});

module.exports = mongoose.model("Review", reviewSchema);