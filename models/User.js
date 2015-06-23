import mongoose from "mongoose";
var bcrypt = require("bcrypt");

var animeListSchema = new mongoose.Schema({
  anime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Anime"
  },
  episodes: [Number]
});

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  animeList: [animeListSchema]
});

var User = mongoose.model("User", userSchema);

User.authenticate = function(username, password, done) {
  User.findOne({
    username: username
  }, function(err, user) {
    if(err) {
      return done(err);
    }
    if(!user) {
      return done(null, false, {
        message: "Incorrect username"
      });
    }
    if(!bcrypt.compareSync(password, user.password)) {
      return done(null, false, {
        message: "Incorrect password"
      });
    }
    return done(null, user);
  });
};

User.createHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.exports = User;
