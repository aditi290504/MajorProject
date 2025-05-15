module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.
        req.flash("error", "You must be Logged in");
        return res.redirect("/login");
    }
    next();
}