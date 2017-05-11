const database = require('../lib/database.js'); 

class Feed extends database.Model {
    get tableName() {
        return 'feeds'
    }
}

module.exports = Feed; 