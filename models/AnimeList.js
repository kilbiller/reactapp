import bookshelf from '../bookshelf';
import User from './User';
import Anime from './Anime';

export default bookshelf.Model.extend({
    tableName: 'animes_users',
    user: function() {
        return this.belongsTo(User);
    },
    anime: function() {
        return this.belongsTo(Anime);
    }
});
