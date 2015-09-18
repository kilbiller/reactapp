import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import React from "react";
import createLocation from "history/lib/createLocation";
import {renderToString} from "react-dom/server";
import {RoutingContext, match} from "react-router";
import clientRoutes from "./client/routes";
import mongoose from "mongoose";

// Models
import User from "./models/User";

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
app.use(favicon(__dirname + '/public/favicon.ico'));
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
      var location = createLocation(req.url)
      match({
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
            var html = renderToString(<RoutingContext {...renderProps}/>);
            res.render("index", {
              html: html
            });
          }
          });
      });

    module.exports = app;
