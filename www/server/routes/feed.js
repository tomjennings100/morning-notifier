const express = require('express');
const router = express.Router();
const { User, Users } = require('../../../models/user');
const { Feed, Feeds } = require('../../../models/feed');
const jwt = require('jsonwebtoken');
const auth = require('../lib/auth');
const secret = require('../../../config/token').secret;

router.get('/', auth.authenticate(), (req, res) => {
    console.log('here');
    Feeds.forge().fetch().then(feeds => {
        res.json(feeds);
    }).catch(e => {
        res.status(500).send('error fetching feeds')
    })
});

router.get('/:id', auth.authenticate(), (req, res) => {
    Feed.forge({ id: req.params.id }).fetch().then(feed => {
        res.json(feed);
    })
})

router.post('/', auth.authenticate(), (req, res) => {
    const { name, url, interval } = req.body;
    console.log(req.body);
    console.log(name)
    if (!name) {
        res.status(500).send('Feed must have a name and URL')
    }
    else {
        Feed.forge({ name, url, interval, users_id: req.user.get('id') }).save().then(feed => {
            res.json(feed);
        })
    }
});

router.delete('/:id', auth.authenticate(), (req, res) => {
    const { id } = req.params
    Feed.forge({ id }).fetch().then(feed => {
        console.log(feed); 
        if (!feed.get('id')) {
            res.status(500).send(`Error: no feed with id ${id} found`)
        }
        else {
            console.log(feed.get('users_id'), req.user.get('id'))
            if (req.user.get('id') === feed.get('users_id')) {
                Feed.forge({ id }).destroy().then(feed => {
                    res.json(feed);
                })
            }
            else {
                res.status(401).send();
            }
        }
    })
})

module.exports = router; 