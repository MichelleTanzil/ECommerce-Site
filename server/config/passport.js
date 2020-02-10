const passport = require("passport");
const User = require("mongoose").model("User");
const localStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      firstNameField: "firstName",
      lastNameField: "lastName",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, {
            message: "Email is already in use, please log in."
          });
        }
        let newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  )
);
