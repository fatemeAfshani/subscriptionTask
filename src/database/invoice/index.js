const knex = require("../db");

const add = (params) => {
  return knex.insert(params, ["id"]).into("invoices");
};

const getLastOne = (id) => {
  return knex
    .select("*")
    .from("invoices")
    .where({ customerSubscriptionId: id })
    .orderBy("endDate", "desc")
    .limit(1);
};

module.exports = {
  add,
  getLastOne,
};
