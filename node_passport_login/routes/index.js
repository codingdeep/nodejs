const express = require('express');
const router  = express.Router();
const {notAuthenticated,ensureAuthenticate} = require('../config/auth')
//HOME PAGER RENDERER
router.get("/",ensureAuthenticate,(req,res)=>{
    res.render("welcome")
})
//HOME PAGER RENDERER
router.get("/dashboard",notAuthenticated,(req,res)=>{
    res.render("dashboard")
})
module.exports = router;
