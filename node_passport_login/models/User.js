const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model("User",UserSchema); //this "User" will be responsible to create collection name
module.exports = User;
