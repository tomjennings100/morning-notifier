const express = require('express');
const router = express.Router();
const { User, Users } = require('../../../models/user')

router.get('/', (req, res) => {
    Users.forge().fetch().then(users => {
        res.json(users);
    })
})

router.get('/:id', (req, res) => {
    User.forge({ id: req.params.id }).fetch(user => {
        res.json(user);
    })
})

router.post('/new', (req, res) => {
    const { email, password, name } = req.body;
    User.forge().signup(email, password, name).then(success => {
        if (success) {
            res.status(200);
        }
        else {
            res.status(500).json('Signup failed');
        }
    }).catch(console.trace)
})

router.put('/:id/edit', (req, res) => {
    User.forge(Object.assign({ id: req.params.id }, req.body)).then(user => {
        res.status(200);
    })
});

router.delete('/:id', (req, res) => {

})

module.exports = router; 