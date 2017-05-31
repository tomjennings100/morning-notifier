const express = require('express');
const router = express.Router();
const { User, Users } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../lib/auth');
const secret = require('../../../config/token').secret;

router.get('/', auth.authenticate(), (req, res) => {
    Users.forge().fetch().then(users => {
        res.json(users);
    })
})

router.get('/:id', (req, res) => {
    User.forge({ id: req.params.id }).fetch().then(user => {
        res.json(user);
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.forge().login(email, password).then(user => {
        token = jwt.sign({ sub: user.get('id') }, secret)
        res.json({
            email: user.get('email'),
            name: user.get('name'),
            token
        });
    }).catch(err => {
        res.status(500).json(err);
    })
});

router.post('/signup', (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) {
        res.status(500).json('requires username and password');
    }

    User.forge().signup(email, password, name).then(success => {
        if (success) {
            res.status(200).send('Signup successful')
        }
        else {
            res.status(500).send();
        }
    }).catch(err => {
        res.status(500).json(err.detail);
    })
})

router.put('/:id/edit', (req, res) => {
    const { id } = req.params;
    User.forge(Object.assign({ id }, req.body)).save({ method: 'update' }).then(user => {
        res.status(200);
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    User.forge({ id }).destroy({ require: true }).then(model => {
        res.status(200).send('Deleted user');
    }).catch(err => res.status(500).send(err))
})

module.exports = router; 