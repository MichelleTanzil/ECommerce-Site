const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config()

let validateEmail = function(email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const apiKey = process.env.API_KEY;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "A first name is required."],
      minlength: [3, "Your last name should be at least 3 characters long"]
    },
    lastName: {
      type: String,
      required: [true, "A last name is required."],
      minlength: [3, "Your last name should be at least 3 characters long"]
    },
    email: {
      type: String,
      required: [true, "An email is required."],
      validate: [validateEmail, "Please use a valid email address"]
    },
    password: {
      type: String,
      required: [true, "A password is required."],
      minlength: [6, "Your password should be at least 6 characters long"]
    },
    hash: String,
    salt: String
  },
  { timestamps: true }
);
UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
UserSchema.methods.validPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      exp: parseInt(expiry.getTime() / 1000)
    },
    apiKey
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model("User", UserSchema);
