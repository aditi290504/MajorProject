const Listing = require("../models/listing");

module.exports.index = async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}
module.exports.newRoute = (req,res) =>{             //this code was giving error so i replace the route by listing instead of listings
    res.render("listings/new.ejs");
}
module.exports.createRouter = async (req, res, next) => {
    const { listing } = req.body;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    await newListing.save();
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
