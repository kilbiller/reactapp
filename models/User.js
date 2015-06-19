import mongoose from "mongoose";
var bcrypt = require("bcrypt");

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var User = mongoose.model("User", schema);

User.authenticate = function(username, password, done) {
  User.findOne({
    username: username
  }, function(err, user) {
    if(err) {
      return done(err);
    }
    if(!user) {
      return done(null, false, {
        message: "Incorrect username."
      });
    }
    if(!bcrypt.compareSync(password, user.password)) {
      return done(null, false, {
        message: "Incorrect password."
      });
    }
    return done(null, user);
  });
};

User.serializeUser = function(user, done) {
  done(null, user.id);
};

User.deserializeUser = function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
};

User.createHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.exports = User;
