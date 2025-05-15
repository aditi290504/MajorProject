const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/reviews.js");


const mongo_Url = "mongodb://127.0.0.1:27017/wonderLust";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main()
   .then(() => {
      console.log("Connected to DB");
   })
   .catch((err) =>{
    console.log(err);
   });

async function main() {
    await mongoose.connect(mongo_Url);
}
app.get("/", (req,res) => {
    res.send("Hi, I am the root");
})

//index route (first page)
app.get("/listings", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

app.get("/listing/new", (req,res) =>{             //this code was giving error so i replace the route by listing instead of listings
    res.render("listings/new.ejs");
});

const listingValidate = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error);
    }else{
        next();
    }
}
const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
}
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

app.delete("/listings/:id", async(req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})


//reviews post route
app.post("/listings/:id/reviews",validateReview,wrapAsync(
    async(req,res) =>{
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
    
        listing.review.push(newReview);
        
        await newReview.save();
        await listing.save();
    
        res.redirect(`/listings/${listing._id}`);
}));

//review delete route

app.delete("/listings/:id/reviews/reviewId", wrapAsync(async(req,res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, )
}))
// app.get("/testListing", async(req,res) => {
//     let sampleListing = new Listing({
//         title:"My new villa",
//         description: "Near city",
//         price : 2000,
//         location: "Pune, Maharashtra",
//         Country:"India",
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     console.log(sampleListing);
//     res.send("SuccessFull testing");
// })

app.use((err,req,res,next) => {
    let {statusCode = 400, message = "something wrong"} = err;
    res.render("error.ejs", {message});
    // res.status(statusCode).send(message);
})
app.listen(3030, () => {
    console.log("Port is listening ");
})

