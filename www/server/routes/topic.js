const express = require('express');
const router = express.Router();
const { Topic, Topics } = require('../../../models/topic');
const auth = require('../lib/auth');

router.post('/', (req, res)=>{
    Topic.forge({
        name:req.body.name, 
        note_id:req.body.note_id,
    })
    .save()
    .then(topic=>res.json(topic))
    .catch(err=>res.status(500).json(err))
})

module.exports = router;