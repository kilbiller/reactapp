import Reflux from "reflux";
import request from "superagent";

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

Actions.addAnime.listen(function(anime) {
  request.post("/api/animes")
    .send(anime)
    .end(function(err, res) {
      if(!err) {
        Actions.addAnime.completed(res.body);
      } else {
        Actions.addAnime.failed(res.body);
      }
    });
});

Actions.deleteAnime.listen(function(title) {
  request.del("/api/animes/" + title)
    .end(function(err, res) {
      if(!err) {
        Actions.deleteAnime.completed(res.body);
      } else {
        Actions.deleteAnime.failed(res.body);
      }
    });
});

export default Actions;
