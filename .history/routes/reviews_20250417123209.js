const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/reviews.js");


const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
}
//reviews post route
router.post("/", validateReview, wrapAsync(
    async(req,res) =>{
        let listing = await Listing.findById(req.params.id);
        console.log(listing);
        let newReview = new Review(req.body.review);
        console.log(newReview);
        console.log(req.params.id);
        console.log(listing);
    
        listing.review.push(newReview._id);
        await newReview.save();
        await listing.save();
       res.redirect(`/listings/${listing._id}`);
}));

//review delete route

router.delete("/:reviewId", wrapAsync(async(req,res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}))
  
module.exports = router;