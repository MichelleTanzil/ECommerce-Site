const passport = require("passport");
// require("../models/user");
const User = require("mongoose").model("User");
const localStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});
