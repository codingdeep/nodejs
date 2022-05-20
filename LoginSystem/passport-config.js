const LocalStrategy = require("passport-local").Strategy;
const bcrypt        = require("bcrypt")
function initialize(passport,getUseByEmail,getUserById){
    const userAuthenticate=async (email,password,done)=>{
        const user = await getUseByEmail(email);
        console.log(user)
        if(user == null){
            return done(null,false,{message: 'User is not exist!'})
        }else {
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user,{message: 'ok'})
                } else {
                    return done(null, false, {message: 'Password is incorrect!'})
                }
            } catch (e) {
                return done(e)
            }
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'},userAuthenticate));
    passport.serializeUser((user,done)=>done(null,user.id));
    passport.deserializeUser((id,done)=>done(null,getUserById(id)))
}

module.exports = initialize
