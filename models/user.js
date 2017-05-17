const database = require('../lib/database.js'); 
const Feed = require('./feed'); 

class User extends database.Model {
    get tableName() {
        return 'users'
    }

    feed() {
        return this.hasMany(Feed)
    }
}

module.exports.User = User;
module.exports.Users = database.Collection.extend({model:User})