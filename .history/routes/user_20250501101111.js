const express = require("express");
const user = require("../models/user");
const passport = require("passport");
const LocalStrategy = require('passport-local');
const router = express.Router();

router.get("/signup", (req,res)=> {
    res.render("users/signup.ejs");
})
router.post("/signup", async(req,res) => {
    try{
        let {username,email,password} = req.body;
        const newUser = new user({email , username});
        const registeredUser = await user.register(newUser, password);
        req.login(registeredUser)
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
router.post("/login", passport.authenticate("local", {failureRedirect:"/login" , failureFlash: true}),async(req,res) => {
    req.flash("success","Welcome back to WonderLust!");
    res.redirect("/listings");
})

router.get("/logout", (req,res) => {
    req.logOut((err)=> {
        if(err){
            return next(err);
        }
        req.flash("success" , "logged out!");
        res.redirect("/listings");
    })
})
module.exports = router;