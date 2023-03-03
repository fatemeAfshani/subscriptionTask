const moment = require("jalali-moment");
const knex = require("../db");

const add = (params) => {
  return knex
    .insert({ ...params, createdAt: moment().format("jYYYY/jMM/jDD HH:mm:ss") })
    .into("customers_activity_history");
};

const get = (params) => {
  return knex.select("*").from("customers_activity_history").where(params);
};

module.exports = {
  add,
  get,
};
