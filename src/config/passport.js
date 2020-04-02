const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
   const user = await User.findOne({ email: email });
   if(!user){
       return done(null, false, { message: 'Not userfound' });
   }else{
       const match = await User.matchPassword(password);
       if(match){
           return done(null, user)
       }else{
           return done(null, false, { message: 'Incorrect Password' });
       }
   }
}))