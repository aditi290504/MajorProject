const express = require("express");
const user = require("../models/user");
const router = express.Router();

router.get("/signup", (req,res)=> {
    res.render("users/signup.ejs");
})
router.post("/signup", async(req,res) => {
    try{
        let {username,email,password} = req.body;
        const newUser = new user({email , username});
        const registeredUser = await user.register(newUser, password);
        req.flash("success", "Welcome to WonderLust!");
        res.redirect("/listings");

    } catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup");
    }  
})
router.get("/login", (req,res)=> {
    res.render("users/login.ejs");
})
router.post("/login", ,async(req,res) => {

})
module.exports = router;