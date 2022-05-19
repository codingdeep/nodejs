const express = require('express');
const bcrypt  = require("bcrypt")
const passport = require("passport")
const validateForm = require('../utils/validation')
const router  = express.Router();
const User = require("../models/User")
const {ensureAuthenticate} = require('../config/auth')
//LOGIN PAGER RENDERER
router.get("/login",ensureAuthenticate,(req,res)=>{
    res.render("login")
});

//LOGIN THE USER
router.post("/login",passport.authenticate('local',{
    successRedirect: "/dashboard",
    failureRedirect: '/users/login',
    failureFlash: true
}));

//LOGIN THE USER
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success_msg","You are logged out!");
    res.redirect('/users/login')
});


//RENDER DASHBOARD
router.get("/dashboard",(req,res)=>{

    res.render('dashboard',{title:"DASHBOARD"})
})

//REGISTER PAGER RENDERER
router.get("/register",(req,res)=>{
    res.render("register")
})

//REGISTER USER HANDLER
router.post("/register",async (req,res)=>{
    let errors = {}
    try{
        const {name,email,password,confirm_password} = req.body;
        errors = validateForm({name,email,password,confirm_password})
        if(password !== confirm_password){
            errors.password = "Password is mismatched";
        }
        if(Object.keys(errors).length == 0){
            User.findOne({email: email})
                .then(async user=>{
                    if(user){
                        errors.global_error = "User is exist with this email!";
                        res.render("register",{errors,title:'REGISTER'})
                    }else{
                        const passwordHashing = await bcrypt.hash(password,10);
                        const newUser = new User({
                            name,
                            email,
                            password: passwordHashing
                        });
                        newUser.save().then(response=>{
                            req.flash('success_msg', 'You are now registered!');

                            res.redirect("/users/login")
                        }).catch(e=>console.log(e))
                    }
                })
        }else{
            res.render("register",{errors,title:'REGISTER'})
        }
    }catch (e){
        res.render("register",{title:'REGISTER'})
    }
});

module.exports = router
