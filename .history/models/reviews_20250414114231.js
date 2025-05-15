const mongoose = require("mongoose");
const { type } = require("../schema");
const { number } = require("joi");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    Comment : String,
    rating : {
        type: number,
        min:
    }
})