const express = require("express");
const router = express.Router();

//index route (first page)
app.get("/listings", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//new route
app.get("/listing/new", (req,res) =>{             //this code was giving error so i replace the route by listing instead of listings
    res.render("listings/new.ejs");
});


module.exports = router;