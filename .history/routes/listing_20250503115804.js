const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");

const listingValidate = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error);
    }else{
        next();
    }
}

//index route (first page)
router.get("/", ListingController.index);

//new route
router.get("/new", isLoggedIn, ListingController.newRoute);

//create route
router.post("/", listingValidate,wrapAsync(ListingController.createRouter));

//show route
router.get("/:id", wrapAsync(ListingController.showRoute));

//edit route
router.get("/:id/edit" ,isLoggedIn,isOwner,);

router.put("/:id", wrapAsync(async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body});
    req.flash("success"," Listing updated!");
    
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id",isOwner, async(req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing deleted!");
    
    res.redirect("/listings");
})


module.exports = router;