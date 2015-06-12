import mongoose from "mongoose";
import slug from "slug";

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
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
  }],
  slug: String
});

schema.pre("save", function(next) {
  this.slug = slug(this.title + "-" + this.year, {
    lower: true
  });
  next();
});

var Anime = mongoose.model("Anime", schema);

module.exports = Anime;
