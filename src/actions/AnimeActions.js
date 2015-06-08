import Reflux from "reflux";
import request from "superagent";

var Actions = Reflux.createActions({
  "refreshStore": {
    children: ["completed", "failed"]
  },
  "addAnime": {
    children: ["completed", "failed"]
  }
});

Actions.refreshStore.listen(function() {
  request.get("/api/anime").end(function(err, res) {
    if(res.ok) {
      Actions.refreshStore.completed(res.text);
    } else {
      Actions.refreshStore.failed(err);
    }
  });
});

Actions.addAnime.listen(function(anime) {
  request.post("/api/anime")
    .send(anime)
    .end(function(err, res) {
      if(res.ok) {
        Actions.addAnime.completed(res.text);
      } else {
        Actions.addAnime.failed(err);
      }
    });
});

export default Actions;
