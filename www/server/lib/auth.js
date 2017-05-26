const { User } = require('./../../../models/user');
const passportJwt = require('passport-jwt');
const passport = require('passport');
const secretOrKey = require('../../../config/token').secret; 

console.log(secretOrKey); 

function extractJwt(req){
    rawAuth = req.get('Authorization')
    console.log(rawAuth); 
    return rawAuth.replace('JWT ', '')
}

passport.use(new passportJwt.Strategy({
    jwtFromRequest: extractJwt,
    //passportJwt.ExtractJwt.fromAuthHeader,
    secretOrKey
}, (jwtPayload, next) => {
    console.log('payload received', jwtPayload)
    User.forge({ id: jwtPayload.id }).fetch().then(user => {
        if (user) {
            next(null, user);
        }
        else {
            next(null, false);
        }
    })
}))

module.exports = {
    authenticate: function () {
        return passport.authenticate('jwt', { session: false })
    },
    initialize: function () {
        return passport.initialize()
    }
}