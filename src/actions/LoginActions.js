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
        Actions.register.completed(JSON.parse(res.text));
      } else {
        Actions.register.failed(JSON.parse(res.text));
      }
    });
});

Actions.login.listen(function(user) {
  request.post("/api/login")
    .send(user)
    .end(function(err, res) {
      if(!err) {
        Actions.login.completed(JSON.parse(res.text));
      } else {
        Actions.login.failed(JSON.parse(res.text));
      }
    });
});

Actions.logout.listen(function() {
  request.get("/api/logout")
    .end(function(err, res) {
      if(!err) {
        Actions.logout.completed(JSON.parse(res.text));
      } else {
        Actions.logout.failed(JSON.parse(res.text));
      }
    });
});

export default Actions;
