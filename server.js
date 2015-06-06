require("babel/register");

var express = require("express");
var morgan = require("morgan");
//var path = require("path");
var mongoose = require("mongoose");
var Anime = require("./Models/Anime");

mongoose.connect("mongodb://localhost/reactapp");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
/*db.once("open", function(callback) {

  var gc = new Anime({
    title: "Guilty Crown",
    image: "http://cdn.myanimelist.net/images/anime/8/33713l.jpg",
    alternativeTitles: [{
      language: "japanese",
      title: "ギルティクラウン"
    }],
    synopsis: "The story takes place in Tokyo in 2039, after the outbreak of the 'Apocalypse Virus' during what became known as the 'Lost Christmas' of 2029. Since then, Japan has been under the control of the multinational organization called GHQ.Ouma Shu is a 17 - year - old boy who mistakenly obtains a rare and great power.He can use this power,'The Right Hand of the King,'to extract 'voids,' or tools / weapons that are the manifestations of peoples ' hearts.He has been rather shy since a childhood tragedy, but both his personality and life change forever when he meets a girl named Yuzuriha Inori, a member of the rebel group called 'Funeral Parlor,' whose members seek the restoration of self - government in Japan via the ousting of GHQ.",
    status: "Finished Airing",
    airStart: "Oct 14, 2011",
    airEnd: "Mar 23, 2012",
    producers: ["Production I.G", "Aniplex", "Dentsu", "FUNimation Entertainment", "Movic", "Fuji TV", "Fuji Pacific Music Publishing"],
    genres: ["Action", "Drama", "Sci-Fi", "Shounen", "Super Power"],
    duration: "24 min. per episode",
    episodes: [{
      number: 1,
      title: "Outbreak:Genesis",
      airDate: "Oct 13, 2011 (JST)"
    }, {
      number: 2,
      title: "The Fittest:Survival of the Fittest",
      airDate: "Oct 20, 2011 (JST)"
    }]
  });

  gc.save(function(err, item) {
    if(err) {
      return console.error(err);
    }
    Anime.find(function(err, animes) {
      if(err) {
        return console.error(err);
      }
      console.log(animes);
    });
  });
});*/

//var middleware = require("./react-router-middleware");

var app = express();

app.set("views", "./");
app.set("view engine", "jade");

app.use(morgan("dev"));
app.use(express.static(__dirname));

app.get("/api/anime", function(req, res) {
  Anime.find(function(err, animes) {
    if(err) {
      return console.error(err);
    }
    res.send(animes);
  });
});

app.get("*", function(req, res) {
  res.render("index");
});

//app.use(middleware);

app.listen(8000);
