const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const logger = require('morgan'); 
const user = require('./routes/user');

app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', user); 

app.listen(3000, (err, ok)=>{
    console.log('Server booted...')
})