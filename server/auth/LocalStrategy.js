// passport
import passport from "passport";
import LocalStrategy from "passport-local"

// model imports
import User from "../models/User.model.js";

passport.use('local', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {

            if (err) {
                return done(err)
            }

            if (!user) {
                return done(null, err)
            }

            if (user.password !== password) {
                return done(null, false)
            }

            return done(null, user)

        });
    }
))

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

export default passport