const knex = require("../db");

const add = (params) => {
  return knex.insert(params, ["id"]).into("customers_subscriptions");
};

const get = (params) => {
  return knex.select("*").from("customers_subscriptions").where(params);
};

module.exports = {
  add,
  get,
};
