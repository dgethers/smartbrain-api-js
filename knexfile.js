const dotenv = require('dotenv');
module.exports = require('knex');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
dotenv.config();

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: '127.0.0.1',
            user: process.env.LOCAL_DB_USER,
            password: process.env.LOCAL_DB_PASSWORD,
            database: process.env.LOCAL_DATABASE
        },
        migrations: {
            directory: "./db/migrations"
        },
        seeds: {
            directory: "./db/seeds"
        }
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL + '?ssl=true',
    }
};
