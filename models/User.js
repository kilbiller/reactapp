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

User.isValidLogin = function(username, password, cb) {
  User.findOne({
    username: username
  }, function(err, user) {
    if(err) {
      return cb(err, null);
    }
    if(!user) {
      return cb(new Error("Incorrect username"), null);
    }
    if(!bcrypt.compareSync(password, user.password)) {
      return cb(new Error("Incorrect password"), null);
    }
    return cb(null, user);
  });
};

User.createHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.exports = User;
