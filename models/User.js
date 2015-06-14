import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

var schema = new mongoose.Schema({
  username: String,
  password: String
});

schema.plugin(passportLocalMongoose);

var User = mongoose.model("User", schema);
module.exports = User;
