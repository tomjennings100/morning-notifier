
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('password_hash');
        table.timestamps(); 
    }).createTable('feeds', function (table) {
        table.string('name');
        table.string('url');
        table.timestamps();
        table.integer('users_id').references('users.id')
    });
};

exports.down = function (knex, Promise) {
    return knex.dropTable('users').dropTable('feeds'); 
};
