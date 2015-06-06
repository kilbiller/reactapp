require("babel/register");

var express = require("express");
var morgan = require("morgan");
//var path = require("path");
var data = require("./mockdata.json");

//var middleware = require("./react-router-middleware");

var app = express();

app.set("views", "./");
app.set("view engine", "jade");

app.use(morgan("dev"));
app.use(express.static(__dirname));

app.get("/api/anime", function(req, res) {
  res.send(data);
});

app.get("*", function(req, res) {
  res.render("index");
});

//app.use(middleware);

app.listen(8000);
