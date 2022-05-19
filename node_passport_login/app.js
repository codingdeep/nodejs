const express = require("express");
const session = require("express-session");
const path    = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require('express-flash')
const userF = require('./utils/userFunctions')
const initialize = require('./config/passport')

initialize(passport,email=>userF.getSingleUser(email),id=>userF.getUserById(id))


//DB Config
const db       = require('./config/keys').MongoURI;
mongoose.connect(db,{useNewUrlParser: true})
    .then(()=>console.log("Mongo DB Connected")).catch(e=>{});

const users    = require('./routes/users')

const port = process.env.PORT || 3000;
const app = express();

//loading EJS engine
app.set('view engine','ejs');

//Body parser
app.use(express.urlencoded({extended: false}));

//SESSION SUPPORT
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("success_msg");

    next();
})

app.use("/",require('./routes'));
app.use("/dashboard",require('./routes'));
app.use("/users",users)


app.listen(port,()=>console.log(`Express server is running on http://localhost:${port}`))
