const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

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
router.route("/").get( ListingController.index).post(isLoggedIn,upload.single("listing[image]"),wrapAsync(ListingController.createRouter));

//new route
router.get("/new", isLoggedIn, ListingController.newRoute);

//

router.route("/:id").get(wrapAsync(ListingController.showRoute)).put(upload.single("listing[image]"), wrapAsync(ListingController.update)).delete(isOwner, ListingController.deleteRoute);


//edit route
router.get("/:id/edit" ,isLoggedIn,isOwner,ListingController.editRoute);


module.exports = router;