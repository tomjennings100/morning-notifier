const express = require('express');
const router = express.Router();
const { Note, Notes } = require('../../../models/note');
const auth = require('../lib/auth');
const secret = require('../../../config/token').secret;

router.get('/', auth.authenticate(), (req, res) => {
    Notes.forge()
        .query({
            where: {
                users_id: req.user.get('id')
            }
        })
        .fetch({
            withRelated: ['topic'],
            columns: ['notes.name', 'notes.id']
        })
        .then(notes => {
            res.json(notes)
        })
});

router.post('/', auth.authenticate(), (req, res) => {
    Note.forge({
        name: req.body.name,
        users_id: req.user.get('id')
    })
    .save()
    .then(note=>{
        res.json(note)
    })

});

module.exports = router; 