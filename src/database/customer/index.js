const knex = require("../db");

const add = (params) => {
  return knex.insert(params, ["id"]).into("customers");
};

const get = (params) => {
  return knex.select("*").from("customers").where(params);
};

module.exports = {
  add,
  get,
};
