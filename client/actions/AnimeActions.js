import Reflux from "reflux";
import request from "superagent";
import Cookies from "js-cookie";

var Actions = Reflux.createActions({
  "getAnimes": {
    children: ["completed", "failed"]
  },
  "getAnime": {
    children: ["completed", "failed"]
  },
  "addAnime": {
    children: ["completed", "failed"]
  },
  "deleteAnime": {
    children: ["completed", "failed"]
  },
  "addEpisode": {
    children: ["completed", "failed"]
  },
  "deleteEpisode": {
    children: ["completed", "failed"]
  },
  "addAnimeToList": {
    children: ["completed", "failed"]
  },
  "removeAnimeFromList": {
    children: ["completed", "failed"]
  }
});

Actions.getAnimes.listen(function() {
  request.get("/api/animes").end(function(err, res) {
    if(!err) {
      Actions.getAnimes.completed(res.body);
    } else {
      Actions.getAnimes.failed(err);
    }
  });
});

Actions.getAnime.listen(function(slug) {
  request.get("/api/animes/" + slug)
    .end(function(err, res) {
      if(!err) {
        Actions.getAnime.completed(res.body);
      } else {
        Actions.getAnime.failed(res.body);
      }
    });
});

Actions.addAnime.listen(function(anime, router) {
  request.post("/api/animes")
    .send(anime)
    .end(function(err, res) {
      if(!err) {
        Actions.addAnime.completed(res.body, router);
      } else {
        Actions.addAnime.failed(res.body);
      }
    });
});

Actions.deleteAnime.listen(function(slug, router) {
  request.del("/api/animes/" + slug)
    .set("Authorization", "JWT " + Cookies.get("token"))
    .end(function(err, res) {
      if(!err) {
        Actions.deleteAnime.completed(res.body, router);
      } else {
        Actions.deleteAnime.failed(res.body);
      }
    });
});

Actions.addEpisode.listen(function(slug, episode) {
  request.post("/api/animes/" + slug + "/episodes")
    .send(episode)
    .end(function(err, res) {
      if(!err) {
        Actions.addEpisode.completed(res.body);
      } else {
        Actions.addEpisode.failed(res.body);
      }
    });
});

Actions.deleteEpisode.listen(function(slug, episodeNumber) {
  request.del("/api/animes/" + slug + "/episodes/" + episodeNumber)
    .end(function(err, res) {
      if(!err) {
        Actions.deleteEpisode.completed(res.body);
      } else {
        Actions.deleteEpisode.failed(res.body);
      }
    });
});

Actions.addAnimeToList.listen(function(slug) {
  request.post("/api/users/animes")
    .set("Authorization", "JWT " + Cookies.get("token"))
    .send({
      slug: slug
    })
    .end(function(err, res) {
      if(!err) {
        Actions.addAnimeToList.completed(res.body);
      } else {
        Actions.addAnimeToList.failed(res.body);
      }
    });
});

Actions.removeAnimeFromList.listen(function(slug) {
  request.del("/api/users/animes/" + slug)
    .set("Authorization", "JWT " + Cookies.get("token"))
    .end(function(err, res) {
      if(!err) {
        Actions.removeAnimeFromList.completed(res.body);
      } else {
        Actions.removeAnimeFromList.failed(res.body);
      }
    });
});

export default Actions;
