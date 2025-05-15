module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You must be Loged in");
        res.redirect("/login")
    }
}