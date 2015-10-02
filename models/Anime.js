import mongoose from "mongoose";
import slug from "slug";

const episodeSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  airDate: Date
});

const animeSchema = new mongoose.Schema({
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
  episodes: [episodeSchema],
  slug: {
    type: String,
    unique: true
  }
});

animeSchema.pre("save", function(next) {
  this.slug = slug(this.title + "-" + this.year, {
    lower: true
  });
  next();
});

const Anime = mongoose.model("Anime", animeSchema);

module.exports = Anime;
