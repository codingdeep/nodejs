const LocalStrategy = require("passport-local");
const bcrypt        = require("bcrypt");
const User = require("../models/User");

function initialize(passport,getUserByEmail,getUserById){
    const isUserAuthenticated=async (email,password,done)=>{
        const user = await getUserByEmail(email)

        if(user == null){
            return done(null,false,{message: 'User is not exist with this email!'})
        }else {
            try{
                if(await bcrypt.compare(password, user.password)){
                    return done(null,user)
                }else {
                    return done(null,false,{message: 'Password is not correct'})
                }
            }catch (e){
                return done(e)
            }
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'},isUserAuthenticated));
    passport.serializeUser((user,done)=>done(null,user.id));
    passport.deserializeUser((id,done)=>done(null,getUserById(id)))
}

module.exports = initialize;
