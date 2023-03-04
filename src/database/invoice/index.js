const knex = require("../db");

const add = (params, customerParams) => {
    return knex.transaction(function (trx) {
    return trx('invoices')
      .insert(params)
      .then(function () {
        return trx('customers')
          .forUpdate()
          .select('*')
          .where({id: customerParams.customerId})
          .then(function (result) {
            const customer  = result?.[0]

            if (customer) {
              return trx('customers')
                .update({credit: customer.credit - customerParams.price})
                .where({id: customerParams.customerId})
            } 
          })
      })
  })
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
      "isActive",
      "price",
      "subscriptionId",
      "credit"
    )
    .from("invoices")
    .leftJoin(
      "customers_subscriptions",
      "customers_subscriptions.id",
      "invoices.customerSubscriptionId"
    )
     .leftJoin(
        "customers",
        "customers.id",
        "customers_subscriptions.customerId"
      )
    .where(params)
    .orderBy("startDate", "desc")
    .limit(limit)
    .offset(offset);
};

module.exports = {
  add,
  getLastOne,
  getALL
};
