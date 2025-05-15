const express = require("express");
const passport = require("passport");
const LocalStrategy = require('passport-local');
const { saveRedirectUrl } = require("../middleware");
const router = express.Router();
const userController = require("../controllers/user");

router.route("/signup").get("/signup", userController.signupForm).post("/signup",userController.signUp);

router.route("/login").get(userController.loginRender).post( saveRedirectUrl,passport.authenticate("local", {failureRedirect:"/login" , failureFlash: true}),userController.login);


router.get("/logout", userController.logout);

module.exports = router;