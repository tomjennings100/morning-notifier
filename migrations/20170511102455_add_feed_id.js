
exports.up = function(knex, Promise) {
  return knex.schema.table('feeds', (table)=>{
    table.increments('id').primary();
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.table('feeds', (table)=>{
      table.dropColumn('id'); 
  })
};
