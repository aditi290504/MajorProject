module.exports.signupForm =(req,res)=> {
    res.render("users/signup.ejs");
}

module.exports.signUp =  async(req,res) => {
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
}

module.exports.loginRender = (req,res)=> {
    res.render("users/login.ejs");
}

module.exports.login = async(req,res) => {
    req.flash("success","Welcome back to WonderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = 