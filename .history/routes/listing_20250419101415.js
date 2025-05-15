const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");

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
router.get("/", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//new route
router.get("/new", (req,res) =>{             //this code was giving error so i replace the route by listing instead of listings
    res.render("listings/new.ejs");
});

//create route
router.post("/", listingValidate,wrapAsync(async (req, res, next) => {
    const { listing } = req.body;
    const newListing = new Listing(listing);
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}));

//show route
router.get("/:id", wrapAsync(async (req,res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id).populate("review");
    if(!listing){
        req.flash("error","Listing you requested does not exists!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}));

//edit route
router.get("/:id/edit" ,async(req,res) =>{
    let id = req.params.id;
    const listing = await Listing.findById(id);
    
    res.render("listings/edit", {listing});
});

router.put("/:id", wrapAsync(async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body});
    req.flash("success"," Listing updated!");
    
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id", async(req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing deleted!");
    
    res.redirect("/listings");
})


module.exports = router;