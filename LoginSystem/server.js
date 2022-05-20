if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express       = require('express');
const session       = require("express-session");
const bodyparser    = require("body-parser");
const passport      = require("passport");
const path = require("path");
const flash = require("express-flash")

const config = require('./router')
const initializeConfig = require('./passport-config');
initializeConfig(
    passport,
    email=>config.users.find(u=>u.email === email),
    id=>config.users.find(u=>u.id === id)
    );

const port  = process.env.PORT || 3000;
const app   = express();


//load body parser to get body
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))


//user static files
app.use('/css',express.static(path.join(__dirname,'/public/assets/css')))
app.use('/images',express.static(path.join(__dirname,'/public/assets/images')))

//setting up default view engine
app.set("view engine",'ejs');

//init express session support

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

//add all the routes here
app.use('/route',config.router)

app.get("/",config.isNotAuthenticated,(req,res)=>{
    res.render("index",{title: 'LOGIN'})
})

app.listen(port,()=>console.log(`Express server is running on http://localhost:${port}`))
