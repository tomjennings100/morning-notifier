const database = require('../lib/database.js');
const { User } = require('./user');
const { Topics } = require('./topic');

class Note extends database.Model {
    get tableName() {
        return 'notes'
    }

    user() {
        return this.belongsTo('User');
    }

    topic() {
        return this.hasMany('Topic');
    }
}

module.exports.Note = database.model('Note', Note);
module.exports.Notes = database.Collection.extend({ model: Note }); 