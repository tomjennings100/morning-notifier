const database = require('../lib/database.js');
const { User } = require('./user');
const { Note } = require('./note');

class Topic extends database.Model {
    get tableName() {
        return 'topics'
    }

    note() {
        return this.belongsTo('Note');
    }
}

module.exports.Topic = database.model('Topic', Topic);
module.exports.Topics = database.Collection.extend({ model: Topic }); 