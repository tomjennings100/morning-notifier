const express = require('express');
const router = express.Router();
const { User, Users } = require('../../../models/user');
const { Feed, Feeds } = require('../../../models/feed');
const jwt = require('jsonwebtoken');
const auth = require('../lib/auth');
const secret = require('../../../config/token').secret;

router.get('/', auth.authenticate(), (req, res) => {
    Feeds.forge().fetch().then(feeds => {
        res.json(feeds);
    })
});

router.get('/:id', auth.authenticate(), (req, res) => {
    Feed.forge({ id: req.params.id }).fetch().then(feed => {
        res.json(feed);
    })
})

router.post('/', auth.authenticate(), (req, res) => {
    const { user } = req;
    const users_id = user.get('id');
    const { name, url } = req.body;
    if (!name || !body) {
        res.status(500).send('Feed must have a name and URL')
    }
    else {
        Feed.forge({ name, url, users_id }).save().then(feed => {
            res.json(feed);
        })
    }
});

router.delete('/:id', auth.authenticate(), (req, res) => {
    Feed.forge({ id: req.params.id }).save().then(feed => {
        if (req.user.get('users_id') === feed.get('users_id')) {
            //delete here
            res.status(200); 
        }
        else {
            res.status(401); 
        }
    })
})

module.exports = router; 