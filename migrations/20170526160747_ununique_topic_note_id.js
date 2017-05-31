
exports.up = function(knex, Promise) {
    return knex.schema.table('topics', (table)=>{
      table.dropUnique('notes_id');
  }); 
};

exports.down = function(knex, Promise) {
    return knex.schema.table('topics', (table)=>{
      table.unique('notes_id');
  }); 
};
