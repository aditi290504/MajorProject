const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");

const listing = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");


const mongo_Url = "mongodb://127.0.0.1:27017/wonderLust";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.use(session(sessionOptions))
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

const sessionOptions = {
    secret : "mysecret",
    resave: false,
    saveUninitialize : true
}

app.get("/", (req,res) => {
    res.send("Hi, I am the root");
})
app.use("/listings", listing);
app.use("/listing", listing);

app.use("/listings/:id/reviews", reviews)
   
app.use((err,req,res,next) => {
    let {statusCode = 400, message = "something wrong"} = err;
    res.render("error.ejs", {message});
    // res.status(statusCode).send(message);
})
app.listen(3030, () => {
    console.log("Port is listening ");
})

