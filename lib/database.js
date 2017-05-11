const connection = require('../config/database').connection; 
const knex = require('knex')({
    client: 'pg',
    connection
}); 
module.exports = require('bookshelf')(knex);