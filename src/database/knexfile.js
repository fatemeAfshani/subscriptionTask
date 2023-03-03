require("../config");
const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
  development: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      port: 5432,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};
