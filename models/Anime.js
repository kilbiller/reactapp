var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  title: String,
  image: String,
  alternativeTitles: [{
    language: String,
    title: String
  }],
  synopsis: String,
  status: String,
  airStart: Date,
  airEnd: Date,
  producers: [String],
  genres: [String],
  duration: String,
  episodes: [{
    number: Number,
    title: String,
    airDate: Date
  }]
});

var Anime = mongoose.model("Anime", schema);

module.exports = Anime;
