var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var React = require("react");
var createLocation = require("history/lib/createLocation");
var ReactDOM = require("react-dom/server");
var Router = require("react-router");
var clientRoutes = require("./client/routes");
var mongoose = require("mongoose");

// Models
var User = require("./models/User");

// MongoDB connection
mongoose.connect("mongodb://localhost/reactapp");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

var app = express();

app.set("views", "./");
app.set("view engine", "jade");
app.set("port", process.env.PORT || 8000);

app.use(logger("dev"));
app.use(express.static(__dirname));
app.use(bodyParser.json());

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

  var location = createLocation(req.url)
  Router.match({
    routes: clientRoutes,
    location: location
  }, function(error, redirectLocation, renderProps) {
    if(redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if(error) {
      res.status(500).send(error.message);
    } else if(renderProps === null) {
      res.status(404).send('Not found');
    } else {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, {
        routes: renderProps.routes,
        params: renderProps.params,
        location: renderProps.location,
        components: renderProps.components,
        history: renderProps.history
      }));

      res.render("index", {
        html: html
      });
    }
  });
});

module.exports = app;
