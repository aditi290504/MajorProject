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
router.ro
//index route (first page)
.get("/", ListingController.index);

//new route
router.get("/new", isLoggedIn, ListingController.newRoute);

//create route
router.post("/", listingValidate,wrapAsync(ListingController.createRouter));

//show route
router.get("/:id", wrapAsync(ListingController.showRoute));

//edit route
router.get("/:id/edit" ,isLoggedIn,isOwner,ListingController.editRoute);

router.put("/:id", wrapAsync(ListingController.update));

//delete route
router.delete("/:id",isOwner, ListingController.deleteRoute);

module.exports = router;