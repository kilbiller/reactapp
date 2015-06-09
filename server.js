require("babel/register");

var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
//var path = require("path");
var mongoose = require("mongoose");
var Anime = require("./models/Anime");

var React = require("react");
var Router = require("react-router");
var routes = require("./routes");

mongoose.connect("mongodb://localhost/reactapp");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

var app = express();

app.set("views", "./");
app.set("view engine", "jade");

app.use(morgan("dev"));
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get("/api/anime", function(req, res) {
  Anime.find(function(err, animes) {
    if(err) {
      return console.error(err);
    }
    res.send(animes);
  });
});

app.post("/api/anime", function(req, res) {
  var anime = new Anime({
    title: req.body.title,
    image: "http://cdn.myanimelist.net/images/anime/8/33713l.jpg",
    alternativeTitles: [{
      language: "japanese",
      title: "ギルティクラウン"
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
      console.error(err);
      res.status(500).json({
        status: 500
      });
    }
    res.status(201).json({
      status: 201,
      url: "http://" + req.hostname + "/animes/" + item.title,
      title: item.title
    });
  });
});

app.delete("/api/anime/:anime", function(req, res) {
  Anime.findOneAndRemove({
    title: req.params.anime
  }, function(err) {
    if(err) {
      return console.error(err);
    }
    res.status(200).json({
      status: 200
    });
  });
});

// Server side rendering to speed up load (then app.js in index.jade takes over as client side-rendering)
app.get("*", function(req, res) {
  var called = false;
  if(req.url === "/favicon.ico") {
    called = true;
  }
  if(!called) {
    var router = Router.create({
      location: req.url,
      routes: routes
    });
    router.run(function(Handler) {
      var elem = React.createElement(Handler);
      var html = React.renderToString(elem);
      res.render("index", {
        html: html
      });
    });
  }
});

app.listen(8000);
