const express = require("express");
const router = express.Router();

router.get("/signup", (req,res)=> {
    res.render("users/signup.ejs");
})
router.post("/signup", (req,res) => {
    let {username,email,password} = req.body;
    consr
})
module.exports = router;