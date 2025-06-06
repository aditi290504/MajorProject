const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/reviews.js");
const { isLoggedIn, isAuthor } = require("../middleware.js");

const ListingController = require("../")

const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
}
//reviews post route
router.post("/", validateReview,isLoggedIn, wrapAsync());

//review delete route

router.delete("/:reviewId",isAuthor, wrapAsync(async(req,res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review deleted!");
    res.redirect(`/listings/${id}`);
}))
  
module.exports = router;