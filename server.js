require("babel/register");

var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
//var path = require("path");
var React = require("react");
var Router = require("react-router");
var clientRoutes = require("./client/routes");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Models
var Anime = require("./models/Anime");
var User = require("./models/User");

// MongoDB connection
mongoose.connect("mongodb://localhost/reactapp");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var app = express();

app.set("views", "./");
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(require("express-session")({
  secret: "reactapp",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname));

// Anime
app.get("/api/animes", function(req, res) {
  Anime.find(function(err, animes) {
    if(err) {
      return console.error(err);
    }
    res.send(animes);
  });
});

app.get("/api/animes/:slug", function(req, res) {
  Anime.findOne({
      slug: req.params.slug
    },
    function(err, anime) {
      if(err) {
        return res.status(400).json({
          status: 400,
          error: err.message
        });
      }
      if(anime === null) {
        return res.status(400).json({
          status: 400,
          error: "Anime does not exists."
        });
      }
      res.status(200).json(anime);
    });
});

app.post("/api/animes", function(req, res) {
  var anime = new Anime({
    title: req.body.title,
    year: req.body.year,
    image: "http://cdn.myanimelist.net/images/anime/8/33713l.jpg",
    alternativeTitles: [{
      language: "japanese",
      title: "test_title"
    }],
    synopsis: req.body.synopsis,
    status: "Finished Airing",
    airStart: "Oct 14, 2011",
    airEnd: "Mar 23, 2012",
    producers: ["Production I.G", "Aniplex", "Dentsu", "FUNimation Entertainment", "Movic", "Fuji TV", "Fuji Pacific Music Publishing"],
    genres: ["Action", "Drama", "Sci-Fi", "Shounen", "Super Power"],
    duration: "24 min. per episode",
    episodes: [{
      number: 1,
      title: "Outbreak:Genesis",
      airDate: "Oct 13, 2011 (JST)"
    }, {
      number: 2,
      title: "The Fittest:Survival of the Fittest",
      airDate: "Oct 20, 2011 (JST)"
    }]
  });

  anime.save(function(err, item) {
    if(err) {
      return res.status(400).json({
        status: 400,
        error: err.message
      });
    }
    res.status(201).json({
      status: 201,
      url: "http://" + req.hostname + "/animes/" + item.slug,
      slug: item.slug
    });
  });
});

app.delete("/api/animes/:anime", function(req, res) {
  if(!req.isAuthenticated()) {
    return res.status(401).json({
      status: 401,
      error: "Need to be authenticated"
    });
  }
  Anime.findOneAndRemove({
    title: req.params.anime
  }, function(err) {
    if(err) {
      return res.status(400).json({
        status: 400,
        error: err.message
      });
    }
    res.status(200).json({
      status: 200,
      action: "animeDeleted"
    });
  });
});

// Register
app.post("/api/register", function(req, res) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err, user) {
    if(err) {
      return res.status(400).json({
        status: 400,
        error: err.message
      });
    }
    passport.authenticate("local")(req, res, function() {
      res.status(201).json({
        status: 201,
        user: req.user
      });
    });
  });
});

// Login
app.post("/api/login", function(req, res) {
  passport.authenticate("local")(req, res, function() {
    res.status(200).json({
      status: 200,
      user: req.user
    });
  });
});

// Logout
app.get("/api/logout", function(req, res) {
  if(req.isAuthenticated()) {
    req.logout();
  }
  res.status(200).json({
    status: 200
  });
});

// Server side rendering to speed up load (then app.js in index.jade takes over as client side-rendering)
app.get("*", function(req, res) {
  // handle unwanted requests
  if(req.url === "/favicon.ico") {
    res.status(200).set("Content-Type", "image/x-icon").end();
    return;
  }

  var router = Router.create({
    location: req.url,
    routes: clientRoutes
  });
  router.run(function(Handler) {
    var elem = React.createElement(Handler);
    var html = React.renderToString(elem);
    res.render("index", {
      html: html
    });
  });
});

module.exports = app;
