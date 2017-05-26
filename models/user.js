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
        //there is probably a better way of doing this than nested promise returning
        return new User({ email }).fetch().then(user => {
            if (!user){
                throw new Error('User not found')
            }
            return bcrypt.compare(password, user.get('password_hash')).then(success=>{
                if(success){
                    return user; 
                }
                else throw new Error('Incorrect password'); 
            })
        })
    }

    signup(email, password, name) {
         return bcrypt.hash(password, 10).then(password_hash => {
             return User.forge({ email, password_hash, name }).save()
        })
    }
}

module.exports.User = User;
module.exports.Users = database.Collection.extend({ model: User }); 