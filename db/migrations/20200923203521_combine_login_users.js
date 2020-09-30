exports.up = (knex) => {
    return knex.schema
        .hasColumn("users", "hash")
        .then(exist => {
            if (!exist) {
                return knex.schema
                    .table("users", (table) => {
                        table.string('hash', 100)

                    })
                    .raw("UPDATE users\n" +
                        "SET hash = login.hash\n" +
                        "FROM login\n" +
                        "WHERE users.email = login.email;");
            }
        })

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
