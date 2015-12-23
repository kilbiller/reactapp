import bookshelf from '../bookshelf';
import User from './User';
import Anime from './Anime';
import EpisodeList from './EpisodeList';

export default bookshelf.Model.extend({
    tableName: 'episodes',
    anime: function() {
        return this.belongsTo(Anime);
    },
    users: function() {
        return this.belongsToMany(User).through(EpisodeList);
    }
});
