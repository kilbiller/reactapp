import bookshelf from '../bookshelf';
import User from './User.js';
import Episode from './Episode.js';

export default bookshelf.Model.extend({
    tableName: 'animes_users',
    user: function() {
        return this.belongsTo(User);
    },
    episode: function() {
        return this.belongsTo(Episode);
    }
});
