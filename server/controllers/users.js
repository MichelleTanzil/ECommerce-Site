const User = require("mongoose").model("User");
const passport = require("passport");

module.exports = {
  csrftoken: function(req, res) {
    let messages = req.flash("error");
    res.json({ csrfToken: req.csrfToken(), messages: messages });
  },
  register: function(req, res) {
    passport.authenticate("local.signup", function(err, user, info) {
      if (err) {
        for (var key in err.errors) {
          req.flash("new_item", err.errors[key].message);
        }
        res.json(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting signup
      if (!user) {
        for (var key in err.errors) {
          req.flash("new_item", err.errors[key].message);
        }
        res.json(err);
      }
      return res.json({ success: true, message: "signup succeeded" });
    });
  }
};
