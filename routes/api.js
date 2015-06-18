var express = require("express");
var passport = require("passport");
var bcrypt = require("bcrypt");

var Anime = require("../models/Anime");
var User = require("../models/User");

var router = express.Router();

// Anime
router.get("/api/animes", function(req, res, next) {
  Anime.find(function(err, animes) {
    if(err) {
      return next(err);
    }
    res.send(animes);
  });
});

router.get("/api/animes/:slug", function(req, res, next) {
  Anime.findOne({
      slug: req.params.slug
    },
    function(err, anime) {
      if(err) {
        return next(err);
      }
      if(!anime) {
        var error = new Error("Anime does not exists.");
        error.status = 404;
        return next(error);
      }
      res.status(200).json(anime);
    });
});

router.post("/api/animes", function(req, res, next) {
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

  anime.save(function(err, anime) {
    if(err) {
      return next(err);
    }
    res.status(201).json({
      status: 201,
      url: "http://" + req.hostname + "/animes/" + anime.slug,
      slug: anime.slug
    });
  });
});

router.delete("/api/animes/:anime", function(req, res, next) {
  if(!req.isAuthenticated()) {
    var error = new Error("Needs to be authenticated");
    error.status = 401;
    return next(error);
  }
  Anime.findOneAndRemove({
    title: req.params.anime
  }, function(err) {
    if(err) {
      return next(err);
    }
    res.status(200).json({
      status: 200
    });
  });
});

// Episodes
router.post("/api/animes/:anime/episodes", function(req, res, next) {
  Anime.findOne({
      slug: req.params.anime
    },
    function(err, anime) {
      if(err) {
        return next(err);
      }
      if(!anime) {
        var error = new Error("Anime does not exists.");
        error.status = 404;
        return next(error);
      }
      anime.episodes.push({
        number: req.body.number,
        title: req.body.title,
        airDate: req.body.airDate
      });
      console.log(anime);

      anime.save(function(err, anime) {
        if(err) {
          return next(err);
        }
        res.status(201).json({
          status: 201,
          anime: anime
        });
      });
    });
});

router.delete("/api/animes/:anime/episodes/:number", function(req, res, next) {
  Anime.findOneAndUpdate({
      slug: req.params.anime
    }, {
      $pull: {
        "episodes": {
          number: req.params.number
        }
      }
    }, {
      safe: true,
      upsert: true,
      new: true
    },
    function(err, anime) {
      if(err) {
        return next(err);
      }
      res.status(200).json({
        status: 200,
        anime: anime
      });
    }
  );
});

// Register
router.post("/api/register", function(req, res, next) {
  var user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  });

  user.save(function(err, user) {
    if(err) {
      return next(err);
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
router.post("/api/login", function(req, res) {
  passport.authenticate("local")(req, res, function() {
    res.status(200).json({
      status: 200,
      user: req.user
    });
  });
});

// Logout
router.get("/api/logout", function(req, res) {
  req.logout();
  res.status(200).json({
    status: 200
  });
});

module.exports = router;
