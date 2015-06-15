import Reflux from "reflux";
import request from "superagent";

var Actions = Reflux.createActions({
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

Actions.register.listen(function(user) {
  request.post("/api/register")
    .send(user)
    .end(function(err, res) {
      if(!err) {
        Actions.register.completed(res.body);
      } else {
        Actions.register.failed(res.body);
      }
    });
});

Actions.login.listen(function(user) {
  request.post("/api/login")
    .send(user)
    .end(function(err, res) {
      if(!err) {
        Actions.login.completed(res.body);
      } else {
        Actions.login.failed(res.body);
      }
    });
});

Actions.logout.listen(function() {
  request.get("/api/logout")
    .end(function(err, res) {
      if(!err) {
        Actions.logout.completed(res.body);
      } else {
        Actions.logout.failed(res.body);
      }
    });
});

export default Actions;
