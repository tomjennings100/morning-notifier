
exports.up = function (knex, Promise) {
    return knex.schema.table('feeds', (table) => {
        table.integer('interval');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('feeds', (table) => {
        table.dropColumn('interval');
    })
};
