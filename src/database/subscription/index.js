const knex = require("../db");

const add = (params) => {
  return knex.insert(params, ["id"]).into("subscriptions");
};

const get = (params) => {
  return knex.select("*").from("subscriptions").where(params);
};

const getAll = (params, limit, offset) => {
  return knex
    .select("*")
    .from("subscriptions")
    .where(params)
    .limit(limit)
    .offset(offset);
};

const updateOne = (params, id) => {
  return knex.from("subscriptions").update(params).where({ id });
};

module.exports = {
  add,
  get,
  updateOne,
  getAll,
};
