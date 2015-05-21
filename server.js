var express = require("express");
var path = require("path");
var data = require("./mockdata.json");

var app = express();

//app.set("views", "../");
app.set("view engine", "jade");

app.use(express.static(__dirname));

app.get("/", function(req, res) {
  res.sendFile("index.html", {
    root: __dirname
  });
});

app.get("/anime", function(req, res) {
  res.send(data);
});

app.listen(8000);
console.log("Express started on port 3000");
