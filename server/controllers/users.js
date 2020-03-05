const User = require("mongoose").model("User");
const passport = require("passport");

module.exports = {
  register: function(req, res) {
    console.log("Registering user: " + req.body.email);
    res.status(200);
    res.json({
      message: "User registered: " + req.body.email
    });
  },
  login: function(req, res) {},

  userProfile: function(req, res) {}
};
