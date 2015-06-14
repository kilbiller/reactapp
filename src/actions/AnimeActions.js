import Reflux from "reflux";
import request from "superagent";

var Actions = Reflux.createActions({
  "refreshStore": {
    children: ["completed", "failed"]
  },
  "addAnime": {
    children: ["completed", "failed"]
  },
  "deleteAnime": {
    children: ["completed", "failed"]
  }
});

Actions.refreshStore.listen(function() {
  request.get("/api/anime").end(function(err, res) {
    if(!err) {
      Actions.refreshStore.completed(JSON.parse(res.text));
    } else {
      Actions.refreshStore.failed(err);
    }
  });
});

Actions.addAnime.listen(function(anime) {
  request.post("/api/anime")
    .send(anime)
    .end(function(err, res) {
      if(!err) {
        Actions.addAnime.completed(JSON.parse(res.text));
      } else {
        Actions.addAnime.failed(JSON.parse(res.text));
      }
    });
});

Actions.deleteAnime.listen(function(title) {
  request.del("/api/anime/" + title)
    .end(function(err, res) {
      if(!err) {
        Actions.deleteAnime.completed(JSON.parse(res.text));
      } else {
        Actions.deleteAnime.failed(JSON.parse(res.text));
      }
    });
});

export default Actions;
