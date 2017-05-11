const database = require('../lib/database.js'); 
const User = require('./user'); 
const Note = require('./note'); 

class Topic extends database.Model {
    get tableName() {
        return 'feeds'
    }

    note() {
        return this.belongsTo(Note); 
    }
}

module.exports = Note; 