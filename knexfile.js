// Update with your config settings.
const dotenv = require('dotenv');
module.exports = require('knex');

dotenv.config();
console.log('DATABASE_URL', process.env.DATABASE_URL);
console.log('CLARIFAI_API_KEY', process.env.CLARIFAI_API_KEY);
module.exports = {

    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
