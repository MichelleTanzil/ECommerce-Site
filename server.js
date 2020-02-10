const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const mongoStore = require("connect-mongo")(session);
const csrf = require("csurf");
const csrfProtection = csrf();
const mongoose = require("mongoose");
const passport = require("passport");

app.use(express.static(__dirname + "/public/dist/public"));
app.use(express.json());

//Database
require("./server/config/mongoose.js");
require("./server/config/passport.js");

//Session
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(flash());
app.use(csrfProtection);
app.use(passport.initialize());
app.use(passport.session());

//Routes
require("./server/config/routes.js")(app);

//Port
app.listen(4200, () => console.log("listening on port 4200"));
