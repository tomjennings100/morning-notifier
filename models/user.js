const database = require('../lib/database.js');
const Feed = require('./feed');
const promisify = require('promisify-native');
const bcrypt = require('bcrypt');

class User extends database.Model {

    get tableName() {
        return 'users'
    }

    feed() {
        return this.hasMany(Feed)
    }

    login(email, password) {
        if (!email || !password) {
            throw new Error('Email and Password are required')
        }
        return new User({ email: email.toLowerCase().trim() }).fetch({ require: true }).then(user => {
           return bcrypt.compare(password, user.get('password_hash'))
        })
    }

    signup(email, password, name) {
        return bcrypt.hash(password, 10).then(password_hash => {
            return User.forge({ email, password_hash, name }).save()
        })
    }
}

module.exports.User = User;
module.exports.Users = database.Collection.extend({ model: User })