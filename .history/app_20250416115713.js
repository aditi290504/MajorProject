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

const listing = require("./routes/listing.js");


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

const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
}

app.use("/listings", listing);

app.use("/listings", listing);

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

app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
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

