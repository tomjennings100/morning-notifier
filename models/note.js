const database = require('../lib/database.js'); 
const User = require('./user'); 
const Topic = require('./topic'); 

class Note extends database.Model {
    get tableName() {
        return 'feeds'
    }

    user() {
        return this.belongsTo(User); 
    }
    
    topic() {
        return this.hasMany(Topic); 
    }
}

module.exports = Note; 