const database = require('../lib/database.js'); 
const User = require('./user'); 
const Article = require('./article')

class Feed extends database.Model {
    get tableName() {
        return 'feeds'
    }

    user() {
        return this.belongsTo(User); 
    }
    
    article() {
        return this.hasMany(Article); 
    }
}

module.exports = Feed; 