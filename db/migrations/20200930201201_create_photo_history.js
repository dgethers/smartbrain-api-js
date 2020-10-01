exports.up = function (knex) {
    return knex.schema.hasTable('photo_history')
        .then(exist => {
            if (!exist) {
                return knex.schema.createTable('photo_history', table => {
                    table.integer('user_id').unsigned().notNullable();
                    table.text('photo_url');
                    table.json('analytics');
                    table.timestamp('upload_datetime');

                    table.foreign('user_id').references('id').inTable('users');
                })
            }
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('photo_history');
};
