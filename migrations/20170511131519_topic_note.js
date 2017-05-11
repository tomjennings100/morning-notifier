
exports.up = function (knex, Promise) {
    return knex.schema.createTable('notes', table => {
        table.string('name');
        table.integer('users_id').references('users.id');
        table.increments('id').primary();
    })
    .createTable('topics', table => {
        table.string('name');
        table.integer('notes_id').unique().references('notes.id');
        table.increments('id').primary();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('topics').dropTable('notes')
};