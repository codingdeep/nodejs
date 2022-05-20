const bcrypt = require("bcrypt")
const LocalStrategy = require("passport-local").Strategy;
function initialize(passport,getUserByEmail){
    //console.log(passport)
    //console.log(getUserByEmail)
    const authenticateUser=async (email,password,done)=>{
        console.log("sdfs",email)
        console.log("asdas",password)
        const user = getUserByEmail(email);
        if(user == null){
            return done(null,false,{message: 'User with this email is not found!'})
        }
        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null,user)
            }else {
                return done(null,false,{message: "Password is not valid"})
            }
        }catch (e){
            return done(e)
        }

    }

    const so = ()=>{}

    passport.use('local',new LocalStrategy({usernameField: 'email'},authenticateUser));
    passport.serializeUser((user,done)=>{});
    passport.deserializeUser((id,done)=>{})

}

module.exports = initialize

