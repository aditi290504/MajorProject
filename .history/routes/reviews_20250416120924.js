const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const reviews = require("../models/reviews.js");


//reviews post route
router.post("/listings/:id/reviews",validateReview,wrapAsync(
    async(req,res) =>{
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
    
        listing.review.push(newReview);
        
        await newReview.save();
        await listing.save();
       res.redirect(`/listings/${listing._id}`);
}));

//review delete route

router.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}))
  
module.exports = review;