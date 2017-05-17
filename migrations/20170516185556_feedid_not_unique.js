
exports.up = function(knex, Promise) {
  return knex.schema.table('articles', (table)=>{
      table.dropUnique('feed_id'); 
  })
};

exports.down = function(knex, Promise) {
  return knex
};
