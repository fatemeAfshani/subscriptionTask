const knex = require("../db");

const add = (params, customerParams) => {
  return knex.transaction(function (trx) {
    return trx("invoices")
      .insert(params)
      .then(function () {
        return trx("customers")
          .forUpdate()
          .select("*")
          .where({ id: customerParams.customerId })
          .then(function (result) {
            const customer = result?.[0];

            if (customer) {
              return trx("customers")
                .update({ credit: customer.credit - customerParams.price })
                .where({ id: customerParams.customerId });
            }
          });
      });
  });
};

const getLastOne = (id) => {
  return knex
    .select("*")
    .from("invoices")
    .where({ customerSubscriptionId: id })
    .orderBy("endDate", "desc")
    .limit(1);
};

const getALL = (params, limit, offset) => {
  return knex
    .select(
      "invoices.id as id",
      "startDate",
      "endDate",
      "customers_subscriptions.price as price",
      "name"
    )
    .from("invoices")
    .leftJoin(
      "customers_subscriptions",
      "customers_subscriptions.id",
      "invoices.customerSubscriptionId"
    )
    .leftJoin(
      "subscriptions",
      "subscriptions.id",
      "customers_subscriptions.subscriptionId"
    )
    .where(params)
    .orderBy("startDate", "desc")
    .limit(limit)
    .offset(offset);
};

module.exports = {
  add,
  getLastOne,
  getALL,
};
