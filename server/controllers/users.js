const User = require("mongoose").model("User");
module.exports = {
  csrftoken: function (req, res) {
    res.json({csrfToken: req.csrfToken()})
  },
  register: function (req, res) {
    res.re
  }
}
