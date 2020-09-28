exports.up = (knex) => {
    return knex.schema
        .hasColumn("users", "hash")
            .then(exist => {
                if (!exist) {
                    return knex.schema.table("users", (table) => {
                        table.string('hash', 100)

                    })
                }
        });
}

exports.down = function (knex) {
    return knex.schema.hasColumn("users", "hash")
        .then(exist => {
            if (exist) {
                return knex.schema.table("users", (table) => {
                    table.dropColumn('hash')
                })
            }
        });
};
