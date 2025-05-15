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
mo