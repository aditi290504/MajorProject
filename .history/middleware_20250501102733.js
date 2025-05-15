module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be Logged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.save