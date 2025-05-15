const express = require("express");
const user = require("../models/user");
const router = express.Router();

router.get("/signup", (req,res)=> {
    res.render("users/signup.ejs");
})
router.post("/signup", async(req,res) => {
    let {username,email,password} = req.body;
    const newUser = new user({email , username});
    const registeredUser = await user.register(newUser, password);
    
})
module.exports = router;