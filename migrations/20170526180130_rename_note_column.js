
exports.up = function (knex, Promise) {
    return knex.schema.table('topics', (table) => {
        table.renameColumn('notes_id', 'note_id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('topics', (table) => {
        table.renameColumn('note_id', 'notes_id');
    });
};
