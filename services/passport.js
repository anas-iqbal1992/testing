const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");
passport.serializeUser((user, done) => {//passport.serializeUser() is setting id as cookie in user’s browser
  done(null, user.id);
});

passport.deserializeUser((id, done) => {//passport.deserializeUser() is getting id from the cookie, which is then used in callback to get user info
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy:true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);