require("babel/register");

var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var React = require("react");
var Router = require("react-router");
var clientRoutes = require("./client/routes");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Models
var User = require("./models/User");

// MongoDB connection
mongoose.connect("mongodb://localhost/reactapp");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Passport config
passport.use(new LocalStrategy(User.authenticate));

var app = express();

app.set("views", "./");
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(passport.initialize());

// server routing
app.use(require("./routes/api"));

// client error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 400);
  console.error("Error " + res.statusCode + ": " + err.message);
  return res.json({
    status: res.statusCode,
    error: err.message
  });
});

// Server side rendering to speed up load (then app.js in index.jade takes over as client side-rendering)
app.use(function(req, res) {
  // handle unwanted requests
  if(req.url === "/favicon.ico") {
    res.status(200).set("Content-Type", "image/x-icon").end();
    return;
  }

  var router = Router.create({
    location: req.url,
    routes: clientRoutes
  });
  router.run(function(Root) {
    var elem = React.createElement(Root);
    var html = React.renderToString(elem);
    res.render("index", {
      html: html
    });
  });
});

module.exports = app;
