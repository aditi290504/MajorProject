const Listing = require("../models/listing");

module.exports.index = async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}
module.exports.newRoute = (req,res) =>{             //this code was giving error so i replace the route by listing instead of listings
    res.render("listings/new.ejs");
}
module.exports.createRouter = 