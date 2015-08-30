var express = require("express");
var jwt = require("jsonwebtoken");
var _ = require("lodash");

var Anime = require("../models/Anime");
var User = require("../models/User");

var router = express.Router();

var jwtSecret = "fdg54FDHA6dh4";

function checkToken(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers["authorization"];
  if(token) {
    jwt.verify(token, jwtSecret, function(err, decoded) {
      if(err) {
        return next(err);
      }
      User.findOne({
        "_id": decoded.iss
      }, function(err, user) {
        if(err) {
          return next(err);
        }
        if(!user) {
          var error = new Error("User account associated with token not found");
          error.status = 401;
          return next(error);
        }
        req.user = user;
        next();
      });
    });
  } else {
    var error = new Error("No token found, please authenticate");
    error.status = 401;
    return next(error);
  }
}

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

router.post("/api/animes", checkToken, function(req, res, next) {
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

router.delete("/api/animes/:slug", checkToken, function(req, res, next) {
  Anime.findOne({
    slug: req.params.slug
  }, function(err, anime) {
    if(err) {
      return next(err);
    }
    User.update({
        "animeList.anime": anime.id
      }, {
        $pull: {
          "animeList": {
            anime: anime.id
          }
        }
      }, {
        multi: true
      },
      function(err, users) {
        if(err) {
          return next(err);
        }
        anime.remove(function(err, anime) {
          if(err) {
            return next(err);
          }
          res.status(200).json({
            status: 200
          });
        });
      });
  });
});

// Episodes
router.post("/api/animes/:slug/episodes", function(req, res, next) {
  Anime.findOne({
      slug: req.params.slug,
      "episodes.number": {
        $ne: req.body.number
      }
    },
    function(err, anime) {
      if(err) {
        return next(err);
      }
      if(!anime) {
        return next(new Error("An episode with the same number already exists"));
      }
      anime.episodes.push({
        number: req.body.number,
        title: req.body.title,
        airDate: new Date(req.body.airDate)
      });

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

router.delete("/api/animes/:slug/episodes/:number", function(req, res, next) {
  Anime.findOneAndUpdate({
      slug: req.params.slug
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
    password: User.createHash(req.body.password)
  });

  user.save(function(err, user) {
    if(err) {
      return next(err);
    }

    var token = jwt.sign({}, jwtSecret, {
      expiresInMinutes: 60 * 24 * 7,
      issuer: user.id
    });

    res.status(201).json({
      status: 201,
      user: user,
      token: token
    });
  });
});

// Login
router.post("/api/login", function(req, res, next) {
  User.isValidLogin(req.body.username, req.body.password, function(err, user) {
    if(err) {
      return next(err);
    }

    var token = jwt.sign({}, jwtSecret, {
      expiresInMinutes: 60 * 24 * 7,
      issuer: user.id
    });

    res.status(200).json({
      status: 200,
      user: user,
      token: token
    });
  });
});

router.post("/api/users/animes", checkToken, function(req, res, next) {
  Anime.findOne({
    slug: req.body.slug
  }, function(err, anime) {
    if(err) {
      return next(err);
    }
    User.findOne({
        username: req.user.username
      })
      .where("animeList.anime").ne(anime.id)
      .exec(function(err, user) {
        if(err) {
          return next(err);
        }
        if(!user) {
          return next(new Error("Anime already in list"));
        }
        user.animeList.push({
          anime: anime.id
        });
        user.save(function(err, user) {
          if(err) {
            return next(err);
          }
          res.status(200).json({
            status: 200
          });
        });
      });
  });
});

router.delete("/api/users/animes/:slug", checkToken, function(req, res, next) {
  Anime.findOne({
    slug: req.params.slug
  }, function(err, anime) {
    if(err) {
      return next(err);
    }
    if(!anime) {
      return next(new Error("Anime was not found"));
    }
    User.findOneAndUpdate({
        username: req.user.username
      }, {
        $pull: {
          "animeList": {
            anime: anime.id
          }
        }
      }, {
        safe: true,
        upsert: true,
        new: true
      },
      function(err, user) {
        if(err) {
          return next(err);
        }
        res.status(200).json({
          status: 200
        });
      }
    );
  });
});

router.post("/api/users/animes/:slug/episodes", checkToken, function(req, res, next) {
  Anime.findOne({
    slug: req.params.slug
  }, function(err, anime) {
    if(err) {
      return next(err);
    }
    if(!anime) {
      return next(new Error("Anime was not found"));
    }
    User.findOne({
        username: req.user.username
      })
      .where("animeList.anime").equals(anime.id)
      .exec(function(err, user) {
        if(err) {
          return next(err);
        }
        if(!user) {
          return next(new Error("The anime you want to add an episode is not in your list"));
        }

        var animeIndex = _.findIndex(user.animeList, {
          "anime": anime["_id"]
        });

        // check if the episode is already seen
        if(_.contains(user.animeList[animeIndex].episodes, req.body.episodeNumber)) {
          return next(new Error("The episode is already seen"));
        }

        user.animeList[animeIndex].episodes.push(req.body.episodeNumber);

        user.save(function(err, user) {
          if(err) {
            return next(err);
          }
          res.status(200).json({
            status: 200
          });
        });
      });
  });
});

router.delete("/api/users/animes/:slug/episodes/:number", checkToken, function(req, res, next) {
  Anime.findOne({
    slug: req.params.slug
  }, function(err, anime) {
    if(err) {
      return next(err);
    }
    if(!anime) {
      return next(new Error("Anime was not found"));
    }
    User.findOne({
        username: req.user.username
      })
      .where("animeList.anime").equals(anime.id)
      .exec(function(err, user) {
        if(err) {
          return next(err);
        }
        if(!user) {
          return next(new Error("The anime you want to remove an episode from is not in your list"));
        }

        var animeIndex = _.findIndex(user.animeList, {
          "anime": anime["_id"]
        });
        var episodeNumber = parseInt(req.params.number, 10);

        // check if the episode is seen
        if(!_.contains(user.animeList[animeIndex].episodes, episodeNumber)) {
          return next(new Error("The episode is not in the list"));
        }

        _.pull(user.animeList[animeIndex].episodes, episodeNumber);

        // need to notify mongoose of the deletion for Mixed Types (aka arrays)
        user.markModified("animeList");

        user.save(function(err, user) {
          if(err) {
            return next(err);
          }
          res.status(200).json({
            status: 200
          });
        });
      });
  });
});

module.exports = router;
