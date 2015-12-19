import bcrypt from 'bcrypt';
import bookshelf from '../bookshelf.js';

export default class User extends bookshelf.Model {
    constructor(...args) {
        super(...args);
        this.tableName = 'users';
    }

    static createHash(password) {
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
