const express = require("express");
const router = express.Router();

router.get("/signup", (req,res)=> {
    res.render("/u");
})

module.exports = router;