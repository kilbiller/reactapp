import knex from 'knex';
import bookshelf from 'bookshelf';

const db = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'reactapp',
        charset: 'utf8'
    }
};

export default bookshelf(knex(db));
