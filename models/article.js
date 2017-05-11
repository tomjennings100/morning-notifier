const database = require('../lib/database.js');
const Feed = require('./feed');

class Article extends database.Model {
    get tableName() {
        return 'articles';
    }

    feed() {
        return this.belongsTo(Feed); 
    }
}