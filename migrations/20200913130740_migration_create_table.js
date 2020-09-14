exports.up = function (knex) {
    knex.schema
        .createTable('users', (table) => {
            table.increments('id').primary()
            table.string('name', 100)
            table.text('email').unique()
            table.bigInteger('entries').defaultTo(0)
            table.timestamp('joined').notNullable()
        })
        .createTable('login', (table) => {
            table.increments('id').primary()
            table.string('hash', 100).notNullable()
            table.text('email').notNullable()
        });
};

exports.down = function (knex) {
    knex.schema
        .dropTable('users')
        .dropTable('login')
};
