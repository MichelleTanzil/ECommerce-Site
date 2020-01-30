const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const mongoStore = require("connect-mongo")(session);
app.use(flash());
app.use(express.static(__dirname + "/public/dist/public"));
app.use(express.json());
const mongoose = require("mongoose");

//Database
require("./server/config/mongoose.js");

//Session
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  })
);

//Routes
require("./server/config/routes.js")(app);

//Port
app.listen(4200, () => console.log("listening on port 4200"));
