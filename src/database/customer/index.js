const knex = require("../db");

const addUser = (params) => {
  return knex.insert(params, ["id"]).into("customers");
};

const get = (params) => {
  return knex.select("*").from("customers").where(params);
};

module.exports = {
  addUser,
  get,
};
