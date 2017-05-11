
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', (table)=>{
      table.string('url').primary(); 
      table.string('headline'); 
      table.text('body', 'longtext'); 
      table.json('feed_object'); 
      table.dateTime('published_date'); 
      table.integer('feed_id').unique().references('feeds.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles'); 
};
