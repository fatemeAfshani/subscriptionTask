const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const knex = require("knex")({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    port: 5432,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  pool: { min: 0, max: 7 },
});

module.exports = knex;
