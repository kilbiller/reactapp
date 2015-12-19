require("babel-core/register");

var app = require("./server.js");

app.listen(app.get("port"), function() {
  console.log("Express server running on port " + app.get("port") + " in " + app.get("env") + " mode");
});
