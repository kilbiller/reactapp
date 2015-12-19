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
