
const mongoose = require("mongoose");
const reviews = require("./reviews");
const { type } = require("../schema");
const { ref } = require("joi");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    
  },
  price: Number,
  location: String,
  country: String,
  review:[{
    type: Schema.Types.ObjectId,
    ref : "Review",
  }],
  owner: {
    type : Schema.Types.ObjectId,
    ref : "User",
  }
});

listingSchema.post("findOneAndDelete", async(listing) =>{
  if(listing){
    await reviews.deleteMany({_id : {$in: listing.review}})
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;