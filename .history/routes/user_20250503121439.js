const express = require("express");
const user = require("../models/user");
const passport = require("passport");
const LocalStrategy = require('passport-local');
const { saveRedirectUrl } = require("../middleware");
const router = express.Router();
const userController = require("")
router.get("/signup", )
router.post("/signup", async(req,res) => {
    try{
        let {username,email,password} = req.body;
        const newUser = new user({email , username});
        const registeredUser = await user.register(newUser, password);
        req.login(registeredUser,(err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WonderLust!");
            res.redirect("/listings");
        })
    } catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup");
    }  
})
router.get("/login", (req,res)=> {
    res.render("users/login.ejs");
})
router.post("/login", saveRedirectUrl,passport.authenticate("local", {failureRedirect:"/login" , failureFlash: true}),async(req,res) => {
    req.flash("success","Welcome back to WonderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
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