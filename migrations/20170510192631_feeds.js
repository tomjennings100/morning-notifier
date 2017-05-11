
exports.up = function (knex, Promise) {
    return knex.schema.createTable('feeds', (table) => {
        table.increments();
        table.string('name');
        table.string('url'); 
        table.timestamps();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('feeds')
};
