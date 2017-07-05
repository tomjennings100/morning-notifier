const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const auth = require('./lib/auth');
const user = require('./routes/user');
const feed = require('./routes/feed'); 
const note = require('./routes/note'); 
const topic = require('./routes/topic'); 
const cors = require('cors'); 

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(auth.initialize());

app.use('/feed', feed); 
app.use('/user', user);
app.use('/note', note); 
app.use('/topic', topic); 

app.listen(3000);