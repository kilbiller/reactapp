import Reflux from "reflux";
import request from "superagent";

const Actions = Reflux.createActions({
  "register": {
    children: ["completed", "failed"]
  },
  "login": {
    children: ["completed", "failed"]
  },
  "logout": {
    children: ["completed", "failed"]
  }
});

Actions.register.listen(function(user, history) {
  request.post("/api/register")
    .send(user)
    .end(function(err, res) {
      if(!err) {
        Actions.register.completed(res.body, history);
      } else {
        Actions.register.failed(res.body);
      }
    });
});

Actions.login.listen(function(user, history) {
  request.post("/api/login")
    .send(user)
    .end(function(err, res) {
      if(!err) {
        Actions.login.completed(res.body, history);
      } else {
        Actions.login.failed(res.body);
      }
    });
});

Actions.logout.listen(function(history) {
  Actions.logout.completed(history);
});

export default Actions;
