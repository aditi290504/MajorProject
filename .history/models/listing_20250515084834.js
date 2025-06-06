
const mongoose = require("mongoose");
const reviews = require("./reviews");
const { type } = require("../schema");
const { ref, string } = require("joi");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename : String,
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
  },
  geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category:{
    type: String,
    enum:["ountains","Trending","Rooms","Iconic City", "Castles","Amazing Pools","Camping","Farms","Arctic","Domes","Boats"]
  }
});

listingSchema.post("findOneAndDelete", async(listing) =>{
  if(listing){
    await reviews.deleteMany({_id : {$in: listing.review}})
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;