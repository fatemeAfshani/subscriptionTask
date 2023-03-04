const knex = require("../db");

const add = (params) => {
  return knex.insert(params, ["id"]).into("customers_subscriptions");
};

const get = (params) => {
  return knex.select("*").from("customers_subscriptions").where(params);
};

const getALL = (params, limit, offset) => {
  return knex
    .select(
      "customers_subscriptions.id as id",
      "name",
      "createdAt",
      "duration",
      "isActive",
      "customers_subscriptions.price as price"
    )
    .from("customers_subscriptions")
    .leftJoin(
      "subscriptions",
      "subscriptions.id",
      "customers_subscriptions.subscriptionId"
    )
    .where(params)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .offset(offset);
};

const updateOne = (params, id) => {
  return knex.from("customers_subscriptions").update(params).where({ id });
};

module.exports = {
  add,
  get,
  updateOne,
  getALL,
};
