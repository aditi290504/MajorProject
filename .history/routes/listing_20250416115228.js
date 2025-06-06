const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

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
ro.get("/listings", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//new route
app.get("/listing/new", (req,res) =>{             //this code was giving error so i replace the route by listing instead of listings
    res.render("listings/new.ejs");
});

//create route
app.post("/listings", listingValidate,wrapAsync(async (req, res, next) => {
    const { listing } = req.body;
    const newListing = new Listing(listing);
    await newListing.save();
    res.redirect("/listings");
}));

//show route
app.get("/listings/:id", wrapAsync(async (req,res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id).populate("review");
    res.render("listings/show.ejs", {listing});
}));

//edit route
app.get("/listings/:id/edit" ,async(req,res) =>{
    let id = req.params.id;
    const listing = await Listing.findById(id);
    res.render("listings/edit", {listing});
});

app.put("/listings/:id", wrapAsync(async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body});
    res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id", async(req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})


module.exports = router;