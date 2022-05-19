module.exports = {
    notAuthenticated:function (req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error_msg","Please login first to view this resource");
        res.redirect("/users/login")
    },
    ensureAuthenticate:function (req,res,next){
        if(req.isAuthenticated()){
            res.redirect("/dashboard")
        }
        next();
    }

}
