const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");


const mongo_Url = "mongodb://127.0.0.1:27017/wonderLust";

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

const initDB = async () => {
    await Listing
}