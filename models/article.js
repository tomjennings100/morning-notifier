const database = require('../lib/database.js');
const Feed = require('./feed');

class Article extends database.Model {
    get tableName() {
        return 'articles';
    }

    get idAttribute() {
        return 'url';
    }

    feed() {
        return this.belongsTo(Feed);
    }
}

module.exports.Article = Article;
module.exports.Articles = database.Collection.extend({ model: Article });