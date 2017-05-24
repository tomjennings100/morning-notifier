const connection = require('../config/database').connection; 
const knex = require('knex')({
    client: 'pg',
    connection
}); 
const bookshelf = require('bookshelf')(knex); 
bookshelf.plugin(require('bookshelf-upsert')); 
module.exports = bookshelf; 