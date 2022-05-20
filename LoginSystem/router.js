const express   = require("express");
const bcrypt    = require("bcrypt");
const {v4:uuidv4} = require("uuid")
const passport = require("passport")
const router    = express.Router();
const users     = [];



//render register screen
router.get('/register',isNotAuthenticated,(req,res)=>{
    res.render('register',{title:'REGISTER'})
});

//register some users
router.post('/register',async (req,res)=>{
    try{
        const {body} = req
        const passwordHashing = await bcrypt.hash(body.password,10);
        const user = {
            id: uuidv4(),
            name: body.name,
            email: body.email,
            password: passwordHashing
        }
        users.push(user);
        res.redirect('/')

    }catch (e){
        res.redirect('/route/register')
    }
})
router.post("/login",passport.authenticate('local',{
    successRedirect: '/route/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/dashboard',isAuthenticated,(req,res)=>{
    res.render('dashboard',{title:'DASHBOARD',name: req.user.name})
});

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

function isNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/route/dashboard')
    }
   next();
}

const config = {
    router,
    users,
    isNotAuthenticated
}
module.exports = config
