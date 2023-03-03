/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("customers", function (table) {
      table.increments("id").primary();
      table.integer("credit", 20).defaultTo(0);
      table.string("username", 255).notNullable();
      table.string("password", 255).notNullable();
    })
    .createTable("subscriptions", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.integer("price", 20).defaultTo(0);
    })
    .createTable("customers_subscriptions", function (table) {
      table.increments("id").primary();
      table.integer("customerId", 255).notNullable();
      table.foreign("customerId").references("id").inTable("customers");
      table.integer("subscriptionId", 255).notNullable();
      table.foreign("subscriptionId").references("id").inTable("subscriptions");
      table.integer("price", 20).defaultTo(0); //beacause subscription price might change at any time
      table.string("createdAt", 20);
      table.string("duration", 20); // amount of time that subscription must be active (default is 1 month)
      table.boolean("isAcitve").notNullable().defaultTo(true);
      table.index("customerId");
    })
    .createTable("invoices", function (table) {
      table.increments("id").primary();
      table.string("startDate", 20);
      table.string("endDate", 20);
      table.integer("customerSubscriptionId", 255).notNullable();
      table
        .foreign("customerSubscriptionId")
        .references("id")
        .inTable("customers_subscriptions");
      table.index("customerSubscriptionId");
    })
    .createTable("customers_activity_history", function (table) {
      table.increments("id").primary();
      table.integer("customerId", 255).notNullable();
      table.foreign("customerId").references("id").inTable("customers");
      table.string("action", 255).notNullable();
      table.string("description", 255);
      table.string("createdAt", 20);
      table.index("customerId");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
