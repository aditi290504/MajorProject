if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require('passport-local');
const user = require("./models/user.js");
const isLoggedIn = require("./middleware.js");

const listing = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const Listing = require('./models/listing.js');

//const mongo_Url = "mongodb://127.0.0.1:27017/wonderLust";

const dbUrl = process.env.ATLAS_URL;

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
    await mongoose.connect(dbUrl);
}
const store =
const sessionOptions = {
    secret : "mysecretsecretstring",
    resave: false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge :  7 * 24 * 60 * 60 * 1000,
    },    
}
// app.get("/", (req,res) => {
//     res.send("Hi, I am the root");
// })

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})
app.use("/listings/Trending", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("filters/Trending.ejs",{allListings});
})
app.use("/listings/Rooms", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("filters/Rooms.ejs",{allListings});
})
app.use("/listings/IconicCity", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("filters/IconicCity.ejs",{allListings});
})
app.use("/listings/Mountains", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("filters/Mountains.ejs",{allListings});
})
app.use("/listings/Castles", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("filters/Castles.ejs",{allListings});
})
app.use("/listings/AmazingPools", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("filters/AmazingPools.ejs",{allListings});
})
app.use("/listings/Camping", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("filters/Camping.ejs",{allListings});
})
app.use("/listings/Arctic", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("filters/Arctic.ejs",{allListings});
})
app.use("/listings/Domes", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("filters/Domes.ejs",{allListings});
})
app.use("/listings/Boats", async(req,res) => {
    const allListings = await Listing.find({});
    res.render("filters/Boats.ejs",{allListings});
})
app.use("/listings", listing);
app.use("/listing", listing);

app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);


// app.get("/demoUser", async (req,res) =>{
//     let fakeUser = new user({
//         email:"student@gmail.com",
//         username : "delta$tudent",
//     });
//     let registeredUser = await user.register(fakeUser,"student");
//     res.send(registeredUser);
// })
   
app.use((err,req,res,next) => {
    let {statusCode = 400, message = "something wrong"} = err;
    res.render("error.ejs", {message});
    // res.status(statusCode).send(message);
})

app.listen(3030, () => {
    console.log("Port is listening ");
})

