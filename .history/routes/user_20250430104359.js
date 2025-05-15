const express = require("express");
const user = require("../models/user");
const router = express.Router();

router.get("/signup", (req,res)=> {
    res.render("users/signup.ejs");
})
router.post("/signup", (req,res) => {
    let {username,email,password} = req.body;
    const newUser = new user({
        
    })
})
module.exports = router;