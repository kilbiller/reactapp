import bcrypt from 'bcrypt';
import bookshelf from '../bookshelf.js';

export default class User extends bookshelf.Model {
    constructor(...args) {
        super(...args);
        this.tableName = 'users';
    }

    static createHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    static isValidLogin(mail, password) {
        const self = this;
        return new Promise(function(resolve, reject) {
            self.where('mail', mail).fetch()
            .then(function(user) {
                if(!user) {
                    reject(new Error('Incorrect username'));
                }

                if(!bcrypt.compareSync(password, user.get('password'))) {
                    reject(new Error('Incorrect password'));
                }
                resolve(user);
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }
}

/* const animeListSchema = new mongoose.Schema({
  anime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Anime"
  },
  episodes: [Number]
});

const userSchema = new mongoose.Schema({
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

const User = mongoose.model("User", userSchema);

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
};*/
