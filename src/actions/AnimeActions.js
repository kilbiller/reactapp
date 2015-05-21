import Reflux from "reflux";
import request from "superagent";

var Actions = Reflux.createActions({
  "refreshStore": {
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

export default Actions;
