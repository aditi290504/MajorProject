const express = require("express");
const user = require("../models/user");
const passport = require("passport");
const LocalStrategy = require('passport-local');
const { saveRedirectUrl } = require("../middleware");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/signup", userController.signupForm);

router.post("/signup",userController.signUp);

router.get("/login", userController.loginRender);

router.post("/login", saveRedirectUrl,passport.authenticate("local", {failureRedirect:"/login" , failureFlash: true}),userController)

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