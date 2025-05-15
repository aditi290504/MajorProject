const geocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { Query } = require("mongoose");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req,res) => {
    const allListings = await Listing.find({});
    console.log(req.)
    res.render("listings/index.ejs", {allListings});
}
module.exports.newRoute = (req,res) =>{             //this code was giving error so i replace the route by listing instead of listings
    res.render("listings/new.ejs");
}
module.exports.createRouter = async (req, res, next) => {
    let response = await geocodingClient
      .forwardGeocode({
        query : req.body.listing.location,
        limit : 1,
      })
      .send();  
    let url = req.file.path;
    let filename = req.file.filename;
    const { listing } = req.body;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}
module.exports.showRoute = async (req,res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id).populate({path:"review", populate:{path: "author",},}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exists!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}
module.exports.editRoute = async(req,res) =>{
    let id = req.params.id;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exists!");
        return res.redirect("/listings");
    }
    res.render("listings/edit", {listing});
}
module.exports.update =  async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        console.log(filename)
        listing.image = {url,filename};
        await listing.save();
        console.log(url)
    }
    req.flash("success"," Listing updated!");
    
    res.redirect(`/listings/${id}`);
}
module.exports.deleteRoute = async(req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing deleted!");
    
    res.redirect("/listings");
}