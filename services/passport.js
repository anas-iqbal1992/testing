const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");
passport.serializeUser((user, done) => {
  //passport.serializeUser() is setting id as cookie in user’s browser
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  //passport.deserializeUser() is getting id from the cookie, which is then used in callback to get user info
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
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id
      }).save();
      done(null, user);
    }
  )
);
