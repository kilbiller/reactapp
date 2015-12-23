import bcrypt from 'bcrypt';
import bookshelf from '../bookshelf';
import Anime from './Anime';
import AnimeList from './AnimeList';
import EpisodeList from './EpisodeList';
import Episode from './Episode';

export default bookshelf.Model.extend({
    tableName: 'users',
    animes: function() {
        return this.belongsToMany(Anime).through(AnimeList);
    },
    episodes: function() {
        return this.belongsToMany(Episode).through(EpisodeList);
    }
}, {
    createHash: function(password) {
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(10, function(err, salt) {
                if(err) {
                    reject(err);
                }

                bcrypt.hash(password, salt, function(err, encrypted) {
                    if(err) {
                        reject(err);
                    }

                    resolve(encrypted);
                });
            });
        });
    },
    isValidLogin: function(mail, password) {
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
});
