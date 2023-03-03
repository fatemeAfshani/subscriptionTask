const knex = require("../db");

const add = (params) => {
  return knex.insert(params, ["id"]).into("customers_subscriptions");
};

const get = (params) => {
  return knex.select("*").from("customers_subscriptions").where(params);
};

const updateOne = (params, id) => {
  return knex.from("customers_subscriptions").update(params).where({ id });
};

module.exports = {
  add,
  get,
  updateOne,
};
