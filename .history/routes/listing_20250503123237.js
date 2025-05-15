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
router.route("/").get( ListingController.index).post( listingValidate,wrapAsync(ListingController.createRouter));

router.route("/:id")


//new route
router.get("/new", isLoggedIn, ListingController.newRoute);

//create route
router
//show route
router.get(, wrapAsync(ListingController.showRoute));

//edit route
router.get("/:id/edit" ,isLoggedIn,isOwner,ListingController.editRoute);

router.put("/:id", wrapAsync(ListingController.update));

//delete route
router.delete("/:id",isOwner, ListingController.deleteRoute);

module.exports = router;