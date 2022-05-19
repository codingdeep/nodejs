const mongoose = require('mongoose');
const User     = require('../models/User')
const getSingleUser=(email)=>{
   return User.findOne({email: email })
        .then(user=>user)
       .catch(e=>console.log('asdadasdads',e))
}
const getUserById=(id)=>{
   return User.findById(id)
        .then(user=>user)
       .catch(e=>console.log("asds",e))
}

const userF = {
    getSingleUser,
    getUserById
}

module.exports = userF
